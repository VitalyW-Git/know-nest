import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './product.model';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [SequelizeModule.forFeature([Product])],
})
export class ProductsModule {}
