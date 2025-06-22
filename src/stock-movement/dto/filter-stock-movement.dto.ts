import { IsOptional, IsUUID } from 'class-validator';

export class FilterStockMovementDto {
  @IsUUID()
  @IsOptional()
  productId?: string;

  @IsUUID()
  @IsOptional()
  userId?: string;

  @IsUUID()
  @IsOptional()
  supplierId?: string;
}
