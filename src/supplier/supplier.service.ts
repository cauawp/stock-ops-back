import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateSupplierDto } from './dto/supplier.dto';

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

  async create(dto: CreateSupplierDto) {
    return this.prisma.supplier.create({
      data: {
        name: dto.name,
        address: dto.address,
        cnpj: dto.cnpj,
        products: dto.products ? {
          create: dto.products
        } : undefined,
      }
    });
  }

  async findOneById(id: string) {
    return this.prisma.supplier.findUnique({
      where: { id },
      include: {
        products: true,
        StockMovement: true,
      },
    });
  }



}
