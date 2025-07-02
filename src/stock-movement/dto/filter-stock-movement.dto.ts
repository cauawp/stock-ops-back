import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';

export class FilterStockMovementDto {
  @ApiPropertyOptional({ example: 'uuid-do-produto' })
  @IsUUID()
  @IsOptional()
  productId?: string;

  @ApiPropertyOptional({ example: 'uuid-do-usuario' })
  @IsUUID()
  @IsOptional()
  userId?: string;

  @ApiPropertyOptional({ example: 'uuid-do-fornecedor' })
  @IsUUID()
  @IsOptional()
  supplierId?: string;
}
