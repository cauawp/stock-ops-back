import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { StockMovementService } from './stock-movement.service';
import { CreateStockMovementDto } from './dto/create-stock-movement.dto';
import { FilterStockMovementDto } from './dto/filter-stock-movement.dto';

@Controller('stock-movement')
export class StockMovementController {
  constructor(private readonly service: StockMovementService) {}

  @Post()
  create(@Body() dto: CreateStockMovementDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll(@Query() filter: FilterStockMovementDto) {
    return this.service.findAll(filter);
  }
}
