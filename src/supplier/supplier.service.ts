import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class SupplierService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.supplier.findMany({
      select: {
        id: true,
        name: true,
        cnpj: true,
        address: true,
        products: {
          select: {
            id: true,
            name: true,
            barcode: true,
            minQuantity: true,
            supplierId: true,
          },
        },
        StockMovement: {  // nome da relação em camelCase
          select: {
            id: true,
            type: true,
            quantity: true,
            reason: true,
            productId: true,
            userId: true,
            createdAt: true,
          },
        },
      },
    });
  }


}
