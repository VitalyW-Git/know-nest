import { PartialType } from '@nestjs/swagger';
import { CreateCatalogOrderItemDto } from './create-catalog_order_item.dto';

export class UpdateCatalogOrderItemDto extends PartialType(CreateCatalogOrderItemDto) {}
