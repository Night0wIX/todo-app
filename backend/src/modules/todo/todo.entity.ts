import {
  AutoIncrement,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from "sequelize-typescript";

import { Category } from "@/modules/category/category.entity.js";

const TABLE_NAME = "todos";
const MODEL_NAME = "Todo";
const MAX_TEXT_LENGTH = 255;

@Table({
  tableName: TABLE_NAME,
  modelName: MODEL_NAME,
})
export class Todo extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column({
    type: DataType.STRING(MAX_TEXT_LENGTH),
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
