// supplier-with-relations.entity.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ProductEntity } from '../../product/dto/product.entity';
import { StockMovementEntity } from '../../stock-movement/dto/stock-movement.entity';

export class SupplierWithRelationsEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  cnpj?: string | null;

  @ApiPropertyOptional()
  address?: string | null;

  @ApiPropertyOptional({ type: [ProductEntity] })
  products?: ProductEntity[];

  @ApiPropertyOptional({ type: [StockMovementEntity] })
  StockMovement?: StockMovementEntity[];
}
