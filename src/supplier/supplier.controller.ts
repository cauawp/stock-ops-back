import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiExtraModels,
} from '@nestjs/swagger';
import { SupplierService } from './supplier.service';
import { CreateSupplierDto } from './dto/supplier.dto';
import { SupplierWithRelationsEntity } from './dto/supplier.entity';

@ApiTags('Fornecedores')
@ApiExtraModels(SupplierWithRelationsEntity)
@Controller('supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Get()
  @ApiOperation({ summary: 'Listar fornecedores' })
  @ApiQuery({ name: 'showProducts', required: false, description: 'Incluir produtos', enum: ['true', 'false'] })
  @ApiQuery({ name: 'showStockMovement', required: false, description: 'Incluir movimentações de estoque', enum: ['true', 'false'] })
  @ApiResponse({
    status: 200,
    description: 'Lista de fornecedores',
    type: SupplierWithRelationsEntity,
    isArray: true,
  })
  async getSuppliers(
    @Query('showProducts') showProducts: string,
    @Query('showStockMovement') showStockMovement: string,
  ): Promise<SupplierWithRelationsEntity[]> {
    const includeProducts = showProducts !== 'false';
    const includeStockMovement = showStockMovement !== 'false';
    const suppliers = await this.supplierService.findAll();

    return suppliers.map(supplier => {
      const result: SupplierWithRelationsEntity = {
        id: supplier.id,
        name: supplier.name,
        cnpj: supplier.cnpj,
        address: supplier.address,
      };

      if (includeProducts) result.products = supplier.products;
      if (includeStockMovement) result.StockMovement = supplier.StockMovement;

      return result;
    });
  }

  @Get(':idSupplier')
  @ApiOperation({ summary: 'Buscar fornecedor por ID' })
  @ApiParam({ name: 'idSupplier', description: 'ID do fornecedor (UUID)' })
  @ApiResponse({
    status: 200,
    description: 'Fornecedor encontrado',
    type: SupplierWithRelationsEntity,
  })
  @ApiResponse({ status: 404, description: 'Fornecedor não encontrado' })
  async getSupplierById(
    @Param('idSupplier') id: string,
  ): Promise<SupplierWithRelationsEntity> {
    const supplier = await this.supplierService.findOneById(id);
    if (!supplier) throw new NotFoundException('Fornecedor não encontrado');
    return supplier;
  }

  @Post()
  @ApiOperation({ summary: 'Criar fornecedor' })
  @ApiResponse({ status: 201, description: 'Fornecedor criado com sucesso' })
  async createSupplier(
    @Body() data: CreateSupplierDto,
  ): Promise<SupplierWithRelationsEntity> {
    return this.supplierService.create(data);
  }
}
