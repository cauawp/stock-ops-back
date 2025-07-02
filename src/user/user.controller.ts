import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserEntity } from './dto/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@ApiTags('Usuários')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  @Roles(Role.admin)
  @ApiOperation({ summary: 'Listar usuários' })
  @ApiResponse({ status: 200, type: [UserEntity] })
  async getUsers(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Criar usuário' })
  @ApiResponse({ status: 201, type: UserEntity })
  async createUser(@Body() data: CreateUserDto): Promise<UserEntity> {
    return await this.userService.create(data);
  }

  @Get(':idUser')
  @ApiOperation({ summary: 'Buscar usuário por ID' })
  @ApiParam({ name: 'idUser', description: 'ID do usuário (UUID)' })
  @ApiResponse({ status: 200, type: UserEntity })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  async getSupplierById(@Param('idUser') id: string) {
    return this.userService.findUserById(id);
  }
}
