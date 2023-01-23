import {Column, Model, AllowNull, Sequelize, Table} from "sequelize-typescript";
import {DATE, DOUBLE, INTEGER, STRING} from 'sequelize';

/**
 * обязательные атрибуты для создания продукта
 */
interface ProductCreateAttributes {
    date_time: string
}

@Table({
    tableName: 'products',
    createdAt: 'date_time',
})
export class Product extends Model<Product, ProductCreateAttributes> {
    @Column({type: INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: STRING})
    title: string;

    @Column({type: DOUBLE})
    price: number;

    @Column({type: DATE})
    date_time: string;
}