import { Module } from '@nestjs/common';
import { CatalogOrderService } from './services/catalog-order.service';
import { CatalogOrderController } from './controllers/catalog-order.controller';

@Module({
  controllers: [CatalogOrderController],
  providers: [CatalogOrderService],
})
export class CatalogOrderModule {}
