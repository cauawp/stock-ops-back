import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // ⬅️ importado aqui
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
import { KeepAliveService } from './keep-alive.service';
import { EmailModule } from './email/email.module';
import { EmailController } from './email/email.controller';
import { EmailService } from './email/email.service';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    AuthModule,
    ProductModule,
    SupplierModule,
    StockMovementModule,
    EmailModule,
  ],
  controllers: [
    AppController,
    UserController,
    SupplierController,
    ProductController,
    EmailController,
  ],
  providers: [
    AppService,
    UserService,
    KeepAliveService,
    SupplierService,
    ProductService,
    EmailService,
  ],
})
export class AppModule {}
