import {
  AutoIncrement,
  Column,
  CreatedAt,
  DataType,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from "sequelize-typescript";

const TABLE_NAME = "categories";
const MODEL_NAME = "Category";
const MAX_NAME_LENGTH = 100;

@Table({
  tableName: TABLE_NAME,
  modelName: MODEL_NAME,
})
export class Category extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column({
    type: DataType.STRING(MAX_NAME_LENGTH),
    allowNull: false,
    unique: true,
  })
  declare name: string;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
