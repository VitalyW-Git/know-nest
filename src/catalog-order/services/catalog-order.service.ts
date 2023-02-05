import { Injectable } from '@nestjs/common';
import { CreateCatalogOrderDto } from '../dto/create-catalog_order.dto';
import { UpdateCatalogOrderDto } from '../dto/update-catalog_order.dto';

@Injectable()
export class CatalogOrderService {
  create(createCatalogOrderDto: CreateCatalogOrderDto) {
    return 'This action adds a new catalogOrder';
  }

  findAll() {
    return `This action returns all catalogOrder`;
  }

  findOne(id: number) {
    return `This action returns a #${id} catalogOrder`;
  }

  update(id: number, updateCatalogOrderDto: UpdateCatalogOrderDto) {
    return `This action updates a #${id} catalogOrder`;
  }

  remove(id: number) {
    return `This action removes a #${id} catalogOrder`;
  }
}
