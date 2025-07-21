import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProductEntity {
  @ApiProperty({ example: 'uuid-produto-1234' })
  id: string;

  @ApiProperty({ example: 'Teclado Mecânico' })
  name: string;

  @ApiProperty({ example: '1234567890123' })
  barcode: string;

  @ApiPropertyOptional({ example: 'https://img.com/produto.jpg' })
  imageUrl: string | null; // <- antes estava string | undefined

  @ApiProperty({ example: 5 })
  minQuantity: number;

  @ApiPropertyOptional({ example: 'uuid-fornecedor-5678' })
  supplierId: string | null; // <- mesma coisa

  @ApiProperty({ example: '2024-01-01T12:00:00.000Z' })
  createdAt: Date;
}
