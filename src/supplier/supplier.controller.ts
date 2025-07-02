import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Supplier } from '@prisma/client';
import { SupplierService } from './supplier.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';

@ApiTags('Fornecedores')
@Controller('supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Get()
  @ApiOperation({ summary: 'Listar fornecedores' })
  @ApiQuery({ name: 'showProducts', required: false, description: 'Incluir produtos' })
  @ApiQuery({ name: 'showStockMovement', required: false, description: 'Incluir movimentações de estoque' })
  @ApiResponse({ status: 200, description: 'Lista de fornecedores' })
  async getSuppliers(
    @Query('showProducts') showProducts: string,
    @Query('showStockMovement') showStockMovement: string
  ): Promise<any[]> {
    const includeProducts = showProducts !== 'false';
    const includeStockMovement = showStockMovement !== 'false';
    const suppliers = await this.supplierService.findAll();

    return suppliers.map(supplier => {
      const result: any = {
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
  async getSupplierById(@Param('idSupplier') id: string) {
    return this.supplierService.findOneById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Criar fornecedor' })
  async createSupplier(@Body() data: any): Promise<Supplier> {
    return await this.supplierService.create(data);
  }
}
