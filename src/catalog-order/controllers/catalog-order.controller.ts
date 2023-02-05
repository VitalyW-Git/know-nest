import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CatalogOrderService } from '../services/catalog-order.service';
import { CreateCatalogOrderDto } from '../dto/create-catalog_order.dto';
import { UpdateCatalogOrderDto } from '../dto/update-catalog_order.dto';

@Controller('catalog-order')
export class CatalogOrderController {
  constructor(private readonly catalogOrderService: CatalogOrderService) {}

  @Post()
  create(@Body() createCatalogOrderDto: CreateCatalogOrderDto) {
    return this.catalogOrderService.create(createCatalogOrderDto);
  }

  @Get()
  findAll() {
    return this.catalogOrderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.catalogOrderService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCatalogOrderDto: UpdateCatalogOrderDto,
  ) {
    return this.catalogOrderService.update(+id, updateCatalogOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catalogOrderService.remove(+id);
  }
}
