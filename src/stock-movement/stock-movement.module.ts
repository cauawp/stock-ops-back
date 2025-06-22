import { Module } from '@nestjs/common';
import { StockMovementService } from './stock-movement.service';
import { StockMovementController } from './stock-movement.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [StockMovementController],
  providers: [StockMovementService, PrismaService],
})
export class StockMovementModule {}
