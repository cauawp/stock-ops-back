import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { EmailService } from './email.service';
import { UserService } from '../user/user.service';

@Controller('email')
export class EmailController {
  constructor(
    private readonly emailService: EmailService,
    private readonly userService: UserService,
  ) {}

  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    try {
      const user = await this.userService.findByEmail(email);

      if (!user) {
        throw new HttpException('Email não encontrado', HttpStatus.NOT_FOUND);
      }

      const resetToken = require('crypto').randomBytes(32).toString('hex');
      const resetTokenExpires = new Date(Date.now() + 1000 * 60 * 60); // 1 hora

      await this.userService.updateResetToken(
        email,
        resetToken,
        resetTokenExpires,
      );

      await this.emailService.sendResetPasswordEmail(email, resetToken);

      return {
        message: 'Email enviado com instruções de redefinição de senha.',
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Erro ao processar esqueci minha senha',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('reset-password')
  async resetPassword(
    @Body('token') token: string,
    @Body('password') newPassword: string,
    @Body('isLogged') isLogged: boolean,
    @Body('userId') userId: string,
  ) {
    try {
      if (isLogged) {
        await this.userService.updatePasswordByUserId(userId, newPassword);
        return { message: 'Senha alterada com sucesso.' };
      } else {
        await this.userService.updatePasswordByResetToken(token, newPassword);
        return { message: 'Senha redefinida com sucesso.' };
      }
    } catch (error) {
      throw new HttpException(
        error.message || 'Erro ao redefinir senha',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
