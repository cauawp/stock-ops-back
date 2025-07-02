import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { StockType } from '@prisma/client';

export class CreateStockMovementDto {
  @ApiProperty({ enum: StockType, example: StockType.entry })
  @IsEnum(StockType)
  type: StockType;

  @ApiProperty({ example: 10 })
  @IsInt()
  quantity: number;

  @ApiProperty({ example: 'Compra de reposição' })
  @IsString()
  reason: string;

  @ApiProperty({ example: 'uuid-do-produto' })
  @IsUUID()
  productId: string;

  @ApiProperty({ example: 'uuid-do-usuario' })
  @IsUUID()
  userId: string;

  @ApiPropertyOptional({ example: 'uuid-do-fornecedor' })
  @IsUUID()
  @IsOptional()
  supplierId?: string;
}
