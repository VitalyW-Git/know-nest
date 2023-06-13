import { configModule } from '@src/config/configure.root';
import { ProductsModule } from '@src/products/products.module';
import { UsersModule } from '@src/users/users.module';
import { CatalogOrderModule } from '@src/catalog-order/catalog-order.module';
import { CatalogOrderItemsModule } from '@src/catalog-order-items/catalog-order-items.module';
import { sequelizeConnectDb } from '@src/config/sequelize-connect.db';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

@Module({
  imports: [
    configModule,
    SequelizeModule.forRootAsync({
      useFactory: sequelizeConnectDb,
      inject: [ConfigService],
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
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
