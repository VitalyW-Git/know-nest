import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductsService } from '../services/products.service';

@Controller('products')
export class ProductsController {
  /**
   * inject service
   * @param productsService
   */
  constructor(private productsService: ProductsService) {}

  @Post()
  create(@Body() productDto: CreateProductDto) {
    return this.productsService.createProduct(productDto);
  }

  @Get()
  getAll() {
    return this.productsService.getAllProducts();
  }
}
