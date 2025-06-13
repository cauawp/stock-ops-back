import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  barcode: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsNotEmpty()
  @IsNumber()
  minQuantity: number;

  @IsOptional()
  @IsString()
  supplierId?: string;
}
