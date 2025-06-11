import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from '../../prisma/prisma.module'; // ajuste o caminho conforme seu projeto

@Module({
  imports: [PrismaModule], // IMPORTANTE: importa o módulo que fornece PrismaService
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
