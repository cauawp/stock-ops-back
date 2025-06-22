import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { StockType } from '@prisma/client';

export class CreateStockMovementDto {
  @IsEnum(StockType)
  type: StockType;

  @IsInt()
  quantity: number;

  @IsString()
  reason: string;

  @IsUUID()
  productId: string;

  @IsUUID()
  userId: string;

  @IsUUID()
  @IsOptional()
  supplierId?: string;
}
