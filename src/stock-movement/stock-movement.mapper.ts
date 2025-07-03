// stock-movement.mapper.ts
import { StockMovementEntity } from './dto/stock-movement.entity';
import { StockMovement } from '@prisma/client';

export function toStockMovementEntity(data: StockMovement): StockMovementEntity {
  return {
    id: data.id,
    type: data.type,
    quantity: data.quantity,
    reason: data.reason,
    productId: data.productId,
    userId: data.userId,
    supplierId: data.supplierId ?? null,
    createdAt: data.createdAt,
  };
}
