import {
  Column,
  Table,
  Model,
  DataType,
  ForeignKey,
  CreatedAt,
  UpdatedAt,
} from "sequelize-typescript";

import { Category } from "@/modules/category/category.entity.js";

@Table({
  tableName: "todos",
  modelName: "Todo",
})
export class Todo extends Model {
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare text: string;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: "category_id",
  })
  declare categoryId: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  declare completed: boolean;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}