import { Product } from '../models/product.model';
import { CreateProductDto } from '../dto/create-product.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ProductsService {
  @InjectModel(Product)
  private readonly productRepository: typeof Product;
  async createProduct(dto: CreateProductDto) {
    return await this.productRepository.create(dto);
  }

  async getAllProducts() {
    return await this.productRepository.findAll();
  }
}
