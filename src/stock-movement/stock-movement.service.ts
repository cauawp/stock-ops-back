import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateStockMovementDto } from './dto/create-stock-movement.dto';
import { StockType } from '@prisma/client';
import { FilterStockMovementDto } from './dto/filter-stock-movement.dto';

@Injectable()
export class StockMovementService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateStockMovementDto) {
    const product = await this.prisma.product.findUnique({
      where: { id: data.productId },
    });

    if (!product) throw new Error('Product not found');

    if (data.type === StockType.exit && data.quantity > product.minQuantity) {
      throw new Error('Stock quantity is insufficient');
    }

    // Optionally update stock levels — if you have a stock count field

    return this.prisma.stockMovement.create({
      data: {
        type: data.type,
        quantity: data.quantity,
        reason: data.reason,
        productId: data.productId,
        userId: data.userId,
        supplierId: data.supplierId,
      },
    });
  }

  async findAll(filter: FilterStockMovementDto) {
    return this.prisma.stockMovement.findMany({
      where: {
        productId: filter.productId,
        userId: filter.userId,
        supplierId: filter.supplierId,
      },
      include: {
        product: true,
        user: true,
        supplier: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
