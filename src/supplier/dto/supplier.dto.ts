import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsArray,
  ValidateNested,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  barcode: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsNumber()
  minQuantity: number;
}

export class CreateSupplierDto {
  @ApiProperty({ example: 'Fornecedor ABC' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: '12.345.678/0001-90', nullable: true })
  @IsOptional()
  @IsString()
  cnpj: string | null;

  @ApiPropertyOptional({ example: 'Rua das Flores, 123', nullable: true })
  @IsOptional()
  @IsString()
  address: string | null;

  @ApiPropertyOptional({ type: [CreateProductDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductDto)
  products?: CreateProductDto[];
}
