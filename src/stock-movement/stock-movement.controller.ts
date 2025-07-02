import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { StockMovementService } from './stock-movement.service';
import { CreateStockMovementDto } from './dto/create-stock-movement.dto';
import { FilterStockMovementDto } from './dto/filter-stock-movement.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';

@ApiTags('Movimentações de Estoque')
@Controller('stock-movement')
export class StockMovementController {
  constructor(private readonly service: StockMovementService) {}

  @Post()
  @ApiOperation({ summary: 'Registrar movimentação de estoque' })
  create(@Body() dto: CreateStockMovementDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar movimentações de estoque com filtros' })
  @ApiQuery({ name: 'productId', required: false })
  @ApiQuery({ name: 'userId', required: false })
  @ApiQuery({ name: 'supplierId', required: false })
  findAll(@Query() filter: FilterStockMovementDto) {
    return this.service.findAll(filter);
  }
}
