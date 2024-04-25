import BaseRoutes from "./base/BaseRoutes";
import validate from "../services/validation.service";
import {createBookSchema, updateBookSchema} from "../books/book.schema";
import BookController from "../books/books.controller";

class BookRoutes extends BaseRoutes {
    public routes(): void {

        // create a new book
        this.router.post(
            "",
            validate(createBookSchema),
            BookController.create
        );

        // update properties of a book based on book id
        this.router.patch(
            "/:id",
            validate(updateBookSchema),
            BookController.update
        );

        // delete a book by id
        this.router.delete(
            "/:id",
            BookController.delete
        );

        // fetching all books
        this.router.get(
            "",
            BookController.findAll
        );

        // fetching a book by id
        this.router.get(
            "/:id",
            BookController.findById
        );

        // this route for the sub route under the books route
        this.router.route("/:id/authors")
            .get((req, res) => {
                console.log(req.params.id);
                let bookId = parseInt(req.params["id"]);
                res.send("These are authors with this book-" + bookId);
            })
            .post((req, res) => {
                console.log(req.params.id);
                let bookId = parseInt(req.params["id"]);
                res.send("This is going to add a new Author to the book-" + bookId);
            });
    }
}

export default new BookRoutes().router