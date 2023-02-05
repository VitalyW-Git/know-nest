import { Module } from '@nestjs/common';
import { CatalogOrderItemsService } from './services/catalog-order-items.service';
import { CatalogOrderItemsController } from './controllers/catalog-order-items.controller';

@Module({
  controllers: [CatalogOrderItemsController],
  providers: [CatalogOrderItemsService],
})
export class CatalogOrderItemsModule {}
