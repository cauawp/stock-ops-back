import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateProductDto } from './dto/product.dto';
import { ProductEntity } from './dto/product.entity';

@ApiTags('Produtos')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({ summary: 'Criar produto' })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({ status: 201, description: 'Produto criado com sucesso', type: ProductEntity })
  create(@Body() data: CreateProductDto): Promise<ProductEntity> {
    return this.productService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Listar produtos' })
  @ApiResponse({ status: 200, type: [ProductEntity] })
  findAll(): Promise<ProductEntity[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar produto por ID' })
  @ApiParam({ name: 'id', description: 'ID do produto' })
  @ApiResponse({ status: 200, type: ProductEntity })
  findOne(@Param('id') id: string): Promise<ProductEntity> {
    return this.productService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar produto' })
  @ApiParam({ name: 'id', description: 'ID do produto' })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({ status: 200, description: 'Produto atualizado com sucesso', type: ProductEntity })
  update(@Param('id') id: string, @Body() data: CreateProductDto): Promise<ProductEntity> {
    return this.productService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir produto' })
  @ApiParam({ name: 'id', description: 'ID do produto' })
  @ApiResponse({ status: 200, description: 'Produto excluído com sucesso', type: ProductEntity })
  remove(@Param('id') id: string): Promise<ProductEntity> {
    return this.productService.remove(id);
  }
}
