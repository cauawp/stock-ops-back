// auth.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  Res,
  Header,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { JwtAuthGuard } from './jwt.guard';
import { PrismaService } from '../../prisma/prisma.service';

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private prisma: PrismaService,
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'Login de usuário' })
  async login(
    @Body() loginDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    const { access_token } = await this.authService.login(user);

    res.cookie('accessToken', access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 dias
    });

    return { user };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @Header('Cache-Control', 'no-store')
  @ApiOperation({ summary: 'Retorna usuário autenticado' })
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        id: 'uuid-exemplo-1234',
        email: 'usuario@exemplo.com',
        role: 'admin',
        name: 'João Silva',
      },
    },
  })
  async me(@Req() req: any) {
    const { userId } = req.user;

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, role: true, name: true },
    });

    return user;
  }

  @Get('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('accessToken', { path: '/' });
    return { success: true };
  }
}
