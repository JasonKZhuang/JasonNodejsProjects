import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({
    tableName: Book.BOOK_TABLE_NAME,
})
export class Book extends Model {
    static BOOK_TABLE_NAME = "book" as string;
    static BOOK_ID = "id" as string;
    static BOOK_NAME = "name" as string;
    static BOOK_DESCRIPTION = "description" as string;

     @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true, // PostgreSQL uses SERIAL type for auto-incrementing primary keys
        field: Book.BOOK_ID,
    })
    declare id: number;

    @Column({
        type: DataType.STRING(100),
        field: Book.BOOK_NAME,
    })
    name!: string;

    @Column({
        type: DataType.STRING(255),
        field: Book.BOOK_DESCRIPTION,
    })
    description!: string;
}