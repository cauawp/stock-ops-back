import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { StockMovementService } from './stock-movement.service';
import { CreateStockMovementDto } from './dto/create-stock-movement.dto';
import { FilterStockMovementDto } from './dto/filter-stock-movement.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { StockMovementEntity } from './dto/stock-movement.entity';
import { toStockMovementEntity } from './stock-movement.mapper';

@ApiTags('Movimentações de Estoque')
@Controller('stock-movement')
export class StockMovementController {
  constructor(private readonly service: StockMovementService) {}

  @Post()
  @ApiOperation({ summary: 'Registrar movimentação de estoque' })
  @ApiResponse({ status: 201, type: StockMovementEntity })
  async create(@Body() dto: CreateStockMovementDto): Promise<StockMovementEntity> {
    const result = await this.service.create(dto);
    return toStockMovementEntity(result);
  }

  @Get()
  @ApiOperation({ summary: 'Listar movimentações de estoque com filtros' })
  @ApiQuery({ name: 'productId', required: false, description: 'Filtra pelo ID do produto' })
  @ApiQuery({ name: 'userId', required: false, description: 'Filtra pelo ID do usuário' })
  @ApiQuery({ name: 'supplierId', required: false, description: 'Filtra pelo ID do fornecedor' })
  @ApiResponse({
    status: 200,
    description: 'Lista de movimentações de estoque',
    type: [StockMovementEntity],
    schema: {
      example: [
        {
          id: 'uuid-exemplo-1',
          type: 'entry',
          quantity: 20,
          reason: 'Compra inicial',
          productId: 'uuid-produto-1',
          userId: 'uuid-usuario-1',
          supplierId: 'uuid-fornecedor-1',
          createdAt: '2025-07-02T12:00:00.000Z',
        },
        {
          id: 'uuid-exemplo-2',
          type: 'exit',
          quantity: 5,
          reason: 'Venda ao cliente',
          productId: 'uuid-produto-2',
          userId: 'uuid-usuario-2',
          supplierId: null,
          createdAt: '2025-07-02T14:30:00.000Z',
        },
      ],
    },
  })
  async findAll(@Query() filter: FilterStockMovementDto): Promise<StockMovementEntity[]> {
    const results = await this.service.findAll(filter);
    return results.map(toStockMovementEntity);
  }
}
