import { Module } from '@nestjs/common';
import { configModule } from './config/configure.root';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { ConfigService } from '@nestjs/config';
import { CatalogOrderModule } from './catalog-order/catalog-order.module';
import { CatalogOrderItemsModule } from './catalog-order-items/catalog-order-items.module';
import { sequelizeConnectDb } from './config/sequelize-connect.db';

@Module({
  imports: [
    configModule,
    SequelizeModule.forRootAsync({
      useFactory: sequelizeConnectDb,
      inject: [ConfigService],
    }),
    ProductsModule,
    UsersModule,
    CatalogOrderModule,
    CatalogOrderItemsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
