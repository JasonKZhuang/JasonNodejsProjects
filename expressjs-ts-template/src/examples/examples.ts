// ==========My Customized Functions ======================= //
import {Express, NextFunction, Request, Response} from "express";

const handleGetBookOne = (req: Request, res: Response, next: NextFunction) => {

    const combinedData = {};

    // path parameters
    console.log(req.params)
    // query parameters
    console.log(req.query)
    // Copy properties and values from req.query to res.params
    Object.assign(combinedData, req.params);
    Object.assign(combinedData, req.query);
    // call next function

    next();
}

const funcMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    req.name = "Tom";
    next();
}

const handleFinalStep = (req: Request, res: Response, next: NextFunction) => {
    console.log("============");
}
// ========================================================= //


// ========== Request Routes  ============================ //
// treating a middleware function using next Function in callback function

// When calling global middleware,
// the second function parameter of this get method will be executed
// next to the global middleware called
function getExample1(app: Express) {
    app.get("/api/globalMiddleware/books/:bookId/:authorId",
        function (req: Request, res: Response, next: NextFunction) {
            // @ts-ignore
            console.log(req.name);
            console.log(res.locals.name)
            // @ts-ignore
            return res.send(res.locals.name);
        }
    );
}

// treating a middleware function using next Function in callback function
function getExample2(app: Express) {
    app.get("/api/middleware/books/:bookId/:authorId",
        funcMiddleware,
        function (req: Request, res: Response, next: NextFunction) {
            // @ts-ignore
            console.log(req.name);
            // @ts-ignore
            return res.send(req.name);
        }
    );
}

// using multiple express NextFunctions in callback function
function getExample3(app: Express) {
    app.get("/api/nextFunc/books/:bookId/:authorId",
        function (req: Request, res: Response, next: NextFunction) {
            next();
        },
        function (req: Request, res: Response, next: NextFunction) {
            console.log(req.params);
            console.log(req.query);
            return res.sendStatus(200);
        }
    );
}


// using express NextFunction in callback function
function getExample4(app: Express) {
    app.get("/api/booksTwoNext/:bookId/:authorId", [handleGetBookOne, handleFinalStep]);
}


// using route parameters
function getExample5(app: Express) {
    app.get("/api/simpleBooks/:bookId/:authorId",
        (req: Request, res: Response) => {
            // path parameters
            console.log(req.params)
            return res.send(req.params)
        }
    )
}


// using string pattern and regular expression
function getExample6(app: Express) {
    app.get("/ab*cd",
        (req: Request, res: Response) => {
            return res.send("/ab*cd")
        }
    )
}

function getExample7(app: Express) {
    app.get("/abc/",
        (req: Request, res: Response) => {
            return res.send("abc")
        }
    )
}


// a sample get request endpoint
function getExample8(app: Express) {
    app.get("/",
        (req: Request, res: Response) => {
            console.log("this is the root get route.");
            return res.send("Hello World");

            /*
            return res.json({
                "name":"Jason",
                "value": 123
            })
            */

            // return res.redirect("https://example.com")
        }
    );
}

// a simple post request endpoint
function getExample9(app: Express) {
    app.post("/",
        (req: Request, res: Response) => {
            console.log(req.body)
            return res.sendStatus(200)
        }
    )
}

function getExample10(app: Express) {
    app.all("/api/all", (req: Request, res: Response) => {
        return res.sendStatus(200);
    })
}

function getExample11(app: Express) {
    app.route("/route")
        .get((req: Request, res: Response) => {
            return res.send("You made a GET request.");
        })
        .post((req: Request, res: Response) => {
            return res.send("You made a POST request.");
        })
        .put((req: Request, res: Response) => {
            return res.send("You made a PUT request.");
        })
        .delete(
            ((req: Request, res: Response) => {
                return res.send("You made a DELETE request.");
            })
        )
        .all((req: Request, res: Response) => {
            return res.send("You made a X request.");
        });
}


function getExample12(app: Express) {
// always using async function inside try catch
    app.get("/error", async (req, rsp) => {
        try {
            await throwsError();
            rsp.sendStatus(200);
        } catch (e) {
            //rsp.sendStatus(400);
            rsp.status(400).send("Something bad happened: " + e);
        }
    });
}

async function throwsError() {
    throw new Error("There is a error.")
}