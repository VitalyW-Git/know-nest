import { Injectable } from '@nestjs/common';
import { CreateCatalogOrderItemDto } from '../dto/create-catalog_order_item.dto';
import { UpdateCatalogOrderItemDto } from '../dto/update-catalog_order_item.dto';

@Injectable()
export class CatalogOrderItemsService {
  create(createCatalogOrderItemDto: CreateCatalogOrderItemDto) {
    return 'This action adds a new catalogOrderItem';
  }

  findAll() {
    return `This action returns all catalogOrderItems`;
  }

  findOne(id: number) {
    return `This action returns a #${id} catalogOrderItem`;
  }

  update(id: number, updateCatalogOrderItemDto: UpdateCatalogOrderItemDto) {
    return `This action updates a #${id} catalogOrderItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} catalogOrderItem`;
  }
}
