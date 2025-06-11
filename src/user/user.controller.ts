import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';
// import { Role } from 'generated/prisma';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles(Role.admin)
  async getUsers(): Promise<{ id: string; name: string; email: string; role: Role }[]> {
    return this.userService.findAll();
  }

  @Post()
  async createUser(@Body() data: any): Promise<User> {
    return await this.userService.create(data);
  }
}