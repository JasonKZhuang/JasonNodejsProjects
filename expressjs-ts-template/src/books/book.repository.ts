import {Book} from "./books.model";

interface IBookRepo {
    save(book: Book): Promise<void>;

    update(book: Book): Promise<void>;

    delete(bookId: number): Promise<void>;

    retrieveById(bookId: number): Promise<Book>;

    retrieveAll(): Promise<Book[]>;
}

export class BookRepo implements IBookRepo {

    async save(book: Book): Promise<void> {
        try {
            await Book.create({
                name: book.name,
                description: book.description,
            });
        } catch (error) {
            throw new Error("Failed to create book!");
        }
    }

    async update(book: Book): Promise<void> {
        try {
            const origin_book = await Book.findByPk(book.id);

            if (!origin_book) {
                throw new Error("Book not found!");
            }
            //console.log(origin_book.changed());
            await origin_book.update({name: book.name, description: book.description})
            // console.log(origin_book.changed());
        } catch (error) {
            throw new Error("Failed to create book!");
        }
    }

    async delete(bookId: number): Promise<void> {
        try {
            const new_book = await Book.findOne({
                where: {
                    id: bookId,
                },
            });
            if (!new_book) {
                throw new Error("Book not found!");
            }

            await new_book.destroy();
        } catch (error) {
            throw new Error("Failed to delete book with error : " + error);
        }
    }

    async retrieveById(bookId: number): Promise<Book> {
        try {
            const new_book = await Book.findOne({
                where: {
                    id: bookId,
                },
            });
            if (!new_book) {
                throw new Error("Book not found!");
            }
            return new_book;
        } catch (error) {
            throw new Error("Failed to find book!");
        }
    }

    async retrieveAll(): Promise<Book[]> {
        try {
            return await Book.findAll({order:[['id','DESC']]});
        } catch (error) {
            throw new Error("Failed to find all books!");
        }
    }

}