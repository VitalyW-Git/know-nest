import { PartialType } from '@nestjs/swagger';
import { CreateCatalogOrderDto } from './create-catalog_order.dto';

export class UpdateCatalogOrderDto extends PartialType(CreateCatalogOrderDto) {}
