import { Column, Model, Table } from 'sequelize-typescript';
import { INTEGER } from 'sequelize';

@Table({
  tableName: 'catalog_order_items',
  collate: 'utf8_general_ci',
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class CatalogOrderItem extends Model<CatalogOrderItem> {
  @Column({
    type: INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  public id: number;
}
