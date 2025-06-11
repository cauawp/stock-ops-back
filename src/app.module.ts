import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { SupplierController } from './supplier/supplier.controller';
import { SupplierService } from './supplier/supplier.service';
import { SupplierModule } from './supplier/supplier.module';
import { StockMovementModule } from './stock-movement/stock-movement.module';
import { ProductService } from './product/product.service';
import { ProductController } from './product/product.controller';

@Module({
  imports: [UserModule, AuthModule, ProductModule, SupplierModule, StockMovementModule],
  controllers: [AppController, SupplierController, ProductController],
  providers: [AppService, SupplierService, ProductService],
})
export class AppModule {}
