import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service'; // src/prisma/prisma.service
import { Prisma, Product } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ProductCreateInput): Promise<Product> {
    return this.prisma.product.create({ data });
  }

  async findAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException('Produto não encontrado');
    return product;
  }

  async update(id: string, data: Prisma.ProductUpdateInput): Promise<Product> {
    await this.findOne(id); // para lançar NotFoundException se não existir
    return this.prisma.product.update({ where: { id }, data });
  }

  async remove(id: string): Promise<Product> {
    await this.findOne(id); // valida existência
    return this.prisma.product.delete({ where: { id } });
  }
}
