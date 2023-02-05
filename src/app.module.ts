import { Module } from '@nestjs/common';
import { configModule } from './config/configure.root';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductsModule } from './products/products.module';
import { Product } from './products/product.model';

const environment = process.env.NODE_ENV || 'development';

@Module({
  imports: [
    configModule,
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: false,
      autoLoadModels: true,
      logging: false,
      define: {
        /**
         * отключаем прежнее поведение
         * error: Unknown column 'createdAt' in 'field list'
         */
        timestamps: false,
      },
      models: [Product],
    }),
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
