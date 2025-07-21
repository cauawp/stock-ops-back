import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import * as cookieParser from 'cookie-parser';

// Swagger - Módulos incluídos
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { SupplierModule } from './supplier/supplier.module';
import { StockMovementModule } from './stock-movement/stock-movement.module';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  // 🌐 Lista de origens permitidas (dev e produção)
  const allowedOrigins = ['http://localhost:3000', 'https://seu-dominio.com'];

  // ✅ Configuração de CORS com tipagem explícita
  const corsOptions: CorsOptions = {
    origin: (
      origin: string | undefined,
      callback: (err: Error | null, allow?: boolean) => void,
    ) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`Origem não permitida pelo CORS: ${origin}`));
      }
    },
    credentials: true,
  };

  app.enableCors(corsOptions);

  // ✅ Validação global para DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // ✅ Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Plataforma de Gestão de Estoque')
    .setDescription(
      'API para controle de produtos, fornecedores, movimentações de estoque e usuários com autenticação JWT.',
    )
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    include: [
      AuthModule,
      UserModule,
      ProductModule,
      SupplierModule,
      StockMovementModule,
      EmailModule,
    ],
  });

  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3001);
}

bootstrap();
