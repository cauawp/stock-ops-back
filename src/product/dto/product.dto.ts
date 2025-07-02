import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Teclado Mecânico' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: '1234567890123' })
  @IsNotEmpty()
  @IsString()
  barcode: string;

  @ApiPropertyOptional({ example: 'https://img.com/produto.jpg' })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({ example: 5 })
  @IsNotEmpty()
  @IsNumber()
  minQuantity: number;

  @ApiPropertyOptional({ example: 'uuid-do-fornecedor' })
  @IsOptional()
  @IsString()
  supplierId?: string;
}
