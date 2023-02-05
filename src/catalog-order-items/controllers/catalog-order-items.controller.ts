import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CatalogOrderItemsService } from '../services/catalog-order-items.service';
import { CreateCatalogOrderItemDto } from '../dto/create-catalog_order_item.dto';
import { UpdateCatalogOrderItemDto } from '../dto/update-catalog_order_item.dto';

@Controller('catalog-order-items')
export class CatalogOrderItemsController {
  constructor(
    private readonly catalogOrderItemsService: CatalogOrderItemsService,
  ) {}

  @Post()
  create(@Body() createCatalogOrderItemDto: CreateCatalogOrderItemDto) {
    return this.catalogOrderItemsService.create(createCatalogOrderItemDto);
  }

  @Get()
  findAll() {
    return this.catalogOrderItemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.catalogOrderItemsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCatalogOrderItemDto: UpdateCatalogOrderItemDto,
  ) {
    return this.catalogOrderItemsService.update(+id, updateCatalogOrderItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catalogOrderItemsService.remove(+id);
  }
}
