import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { StockType } from '@prisma/client';

export class StockMovementEntity {
  @ApiProperty()
  id: string;

  @ApiProperty({ enum: StockType })
  type: StockType;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  reason: string;

  @ApiProperty()
  productId: string;

  @ApiProperty()
  userId: string;

  @ApiPropertyOptional()
  supplierId?: string | null;  // aceita string ou null ou undefined

  @ApiProperty()
  createdAt: Date;
}
