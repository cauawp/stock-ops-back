import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSupplierDto {
  @ApiProperty({ example: 'Fornecedor ABC' })
  name: string;

  @ApiPropertyOptional({ example: '12.345.678/0001-90', nullable: true })
  cnpj: string | null;

  @ApiPropertyOptional({ example: 'Rua das Flores, 123', nullable: true })
  address: string | null;

  @ApiPropertyOptional({
    type: 'array',
    items: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Produto XYZ' },
        barcode: { type: 'string', example: '1234567890123' },
        imageUrl: { type: 'string', example: 'https://img.com/produto.jpg' },
        minQuantity: { type: 'number', example: 10 },
      },
    },
  })
  products?: {
    name: string;
    barcode: string;
    imageUrl?: string;
    minQuantity: number;
  }[];
}
