import { Prisma } from '@prisma/client';
import { Injectable,  
  BadRequestException,
  ConflictException,
  InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    const passwordHash = await bcrypt.hash(dto.password, 10);

    try {
      return await this.prisma.user.create({
        data: {
          name: dto.name,
          email: dto.email,
          passwordHash,
          role: dto.role,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Erro de chave única (email duplicado)
        if (error.code === 'P2002') {
          throw new ConflictException(`E-mail "${dto.email}" já está em uso.`);
        }

        // Erro de enum inválido
        if (error.code === 'P2003' || error.code === 'P2005') {
          throw new BadRequestException(`Valor inválido em um dos campos.`);
        }
      }

      // Erros de validação da aplicação (ex: e-mail inválido, senha fraca)
      if (error instanceof BadRequestException) {
        throw error;
      }

      // Outro erro desconhecido
      throw new InternalServerErrorException('Erro interno ao criar usuário');
    }
  }

  findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        // Exclui passwordHash por segurança
      },
    });
  }
}
