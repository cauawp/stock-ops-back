// prisma.service.ts
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy {
  constructor() {
    super();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
