import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Supplier } from '@prisma/client';
import { SupplierService } from './supplier.service';

@Controller('supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Get()
  async getSuppliers(): Promise<
    {
      id: string;
      name: string;
      cnpj: string | null;
      address: string | null;
      products: Array<{
        id: string;
        name: string;
        barcode: string;
        minQuantity: number;
        supplierId: string | null;
      }>;
      StockMovement: Array<{
        id: string;
        type: string;
        quantity: number;
        reason: string;
        productId: string;
        userId: string;
        createdAt: Date;
      }>;
    }[]
  > {
    return this.supplierService.findAll();
  }

  @Get(':idSupplier')
  async getSupplierById(@Param('idSupplier') id: string) {
    return this.supplierService.findOneById(id);
  }

  @Post()
  async createSupplier(@Body() data: any): Promise<Supplier> {
    return await this.supplierService.create(data);
  }
}
