import express, {Application, NextFunction, Request, Response} from "express";
import helmet from "helmet";
import Database from "./config/database";
import BookRoute from "./routes/book.route";

console.log("===> Hello, the backend server is starting ...");

// @ts-ignore
const port: number = parseInt(process.env.SERVER_PORT) || 5000;

// this application is an Express.js application
class App {
    public app: Application;

    /**
     * the construction of App class, init db, plugin and routes
     * Step 1
     */
    constructor() {
        this.app = express();
        this.databaseSync();
        this.plugins();
        this.routes();
    }

    /**
     * Step 2
     * @protected
     */
    protected databaseSync(): void {
        const db = new Database();
        db.sequelize?.sync();
    }

    /**
     * Step 3
     * @protected
     */
    protected plugins(): void {
        /* this app can accept json body */
        this.app.use(express.json());

        /* this app can accept encoded url */
        this.app.use(express.urlencoded({extended: true}));

        /*
            Use helmet to enhance the security of your Express applications by setting various HTTP headers,
            including request headers and response headers
        */
        this.app.use(helmet())

        /* this is a global middleware */
        this.app.use(this.globalMiddleware({arg: "parameter passed to global middleWare next function"}));

    }


    /**
     * Step 4
     * @protected
     */
    protected routes(): void {
        this.app.route("/").get((req: Request, res: Response) => {
            res.send("<h1>welcome home</h1>");
        });
        this.app.use("/api/v1/books", BookRoute);

        // add more route modules ...
    }

    /**
     * Step 6
     * this middleware function accept a json object and return a function
     * @param arg json object
     * @return a next function
     */
    protected globalMiddleware = ({arg}: { arg: any }) => (
        (req: Request,
         res: Response,
         next: NextFunction) => {
            console.log("===> This is Global middleware next function, do something globally like verify user token.");
            next();
        }
    );
}

/**
 * Step 0 entrance  new application instance
 */
const app = new App().app;

/**
 * Step 5
 *  ==> start the backend express service application at port=== //
 */
app.listen(port, () => {
    console.log("===> Application is listening at http://localhost:" + port);
})



