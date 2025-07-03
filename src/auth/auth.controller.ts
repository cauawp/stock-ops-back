import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../user/dto/login-user.dto';

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login de usuário' })
  @ApiResponse({
    status: 201,
    description: 'Usuário autenticado com sucesso',
    schema: {
      example: {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        user: {
          id: 'uuid-exemplo-1234',
          email: 'usuario@exemplo.com',
          role: 'admin',
          name: 'João Silva',
        },
      },
    },
  })
  async login(@Body() loginDto: LoginUserDto) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    return this.authService.login(user);
  }
}
