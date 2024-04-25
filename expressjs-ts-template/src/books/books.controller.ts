// this controller is invoked by routes and will import and call book service
import {Errback, NextFunction, Request, Response} from "express";
import {BookRepo} from "./book.repository";
import {Book} from "./books.model";

class BookController {

    async booksMiddleWare (req: Request, res: Response, next: NextFunction) {
        console.log("this is private middleware next function, do something specific ...");
        next();
    }

    async booksFinalCall(req: Request, res: Response, next: NextFunction) {
        console.log(req.params);
        console.log(req.query);
        console.log(req.body);
        console.log("this is private finally next function.");
        res.status(200).send(
            {
                "Sequence 1": "Called from request entry =>",
                "Sequence 2": "Called global middleware next Function=>",
                "Sequence 3": "Called private middleware next Function=>",
                "Sequence 4": "Called finally next Function."
            }
        );
    }


    async create(req: Request, res: Response) {
        try {
            const new_book = new Book();
            new_book.name = req.body.name;
            new_book.description = req.body.description;

            await new BookRepo().save(new_book);

            res.status(201).json({
                status: "Created!",
                message: "Successfully created a book!",
            });
        } catch (err) {
            res.status(500).json({
                status: "500",
                message: "Internal Server Error.",
            });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            let id = parseInt(req.params["id"]);
            await new BookRepo().delete(id);

            res.status(200).json({
                status: "Ok!",
                message: "Successfully deleted book!",
            });
        } catch (err: any) {
            res.status(400).json({
                status: "400",
                message: err.message,
            });
        }
    }

    async findById(req: Request, res: Response) {
        try {
            let id = parseInt(req.params["id"]);
            const new_book = await new BookRepo().retrieveById(id);

            res.status(200).json({
                status: "Ok!",
                message: "Successfully fetched book by id!",
                data: new_book,
            });
        } catch (err) {
            res.status(500).json({
                status: "Internal Server Error!",
                message: "Internal Server Error!",
            });
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const new_books = await new BookRepo().retrieveAll();

            res.status(200).json({
                status: "Ok!",
                message: "Successfully fetched all note data!",
                data: new_books,
            });
        } catch (err) {
            res.status(500).json({
                status: "Internal Server Error!",
                message: "Internal Server Error!",
            });
        }
    }

    async update(req: Request, res: Response) {
        try {
            let id = parseInt(req.params["id"]);
            const new_book = new Book();

            new_book.id = id;
            new_book.name = req.body.name;
            new_book.description = req.body.description;

            await new BookRepo().update(new_book);

            res.status(200).json({
                status: "Ok!",
                message: "Successfully updated book data!",
            });
        } catch (err) {
            res.status(500).json({
                status: "Internal Server Error!",
                message: "Internal Server Error!",
            });
        }
    }
}

export default new BookController();
