// app.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // certifique-se de ter o PrismaService

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async pingDb(): Promise<string> {
    // Faz uma query simples no banco para manter ativo
    await this.prisma.$queryRaw`SELECT 1`;
    return 'pong';
  }
}
