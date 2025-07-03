// product.entity.ts (exemplo)
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProductEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  barcode: string;

  @ApiPropertyOptional()
  imageUrl?: string | null;

  @ApiProperty()
  minQuantity: number;

  @ApiPropertyOptional()
  supplierId?: string | null;

  @ApiProperty()
  createdAt: Date;
}
