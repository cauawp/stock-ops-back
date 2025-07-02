import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { Role } from '@prisma/client';

export class CreateUserDto {
  @ApiProperty({ example: 'João Silva' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'joao@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'senhaSegura123' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
  @MinLength(6)
  password: string;

  @ApiProperty({ enum: Role, example: Role.operator })
  @IsEnum(Role, { message: 'Role inválido. Use um dos valores permitidos.' })
  role: Role;
}
