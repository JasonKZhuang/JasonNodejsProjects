# 1. Install Prerequisites

<details>

- Node
- npm
- yarn

</details>

# 2. Create a new Application and Initialize

<details>
- Initialize a Nodejs application, adding properties into package.json file

```shell
 mkdir your_app
 cd your_app
 npm init #package.json 
# or 
yarn init
```

</details>

# 3. Install dependencies

<details>

## Install ts-node-dev and typescript dependency into devDependency

```shell
npm i typescript -D
npm i ts-node-dev -D 
``` 

## Generate an initial typescript compile file tsconfig.ts

```shell
npx tsc --init 
```

- more typescript configuration see https://www.typescriptlang.org/tsconfig

## Install express and types for Typescript

```shell
npm i express 
npm i @types/node -D
npm i @types/express -D
```

## Install Nodemon

- Nodemon is a utility for Node.js that helps in development by automatically restarting the Node.js application when
  file changes in the directory are detected.
- It's particularly useful during the development phase, as it eliminates the need to manually stop and restart the
  server every time a change is made to the code.

```shell
npm i nodemon -D
```

## Install pg for PostgreSQL client

- Non-blocking PostgreSQL client for Node.js. Pure JavaScript and optional native libpq bindings.

```shell
npm i pg
```

## Install  Sequelize ORM

- Sequelize is an easy-to-use and promise-based **Node.js ORM tool** for Postgres, MySQL, MariaDB, SQLite, DB2,
  Microsoft SQL Server, and Snowflake.
- It features solid transaction support, relations, eager and lazy loading, read replication and more.

```shell
npm i sequelize sequelize-typescript
```

## install reflect-metadata

- reflect-metadata is a library for TypeScript that allows you to add and read metadata from decorators. In TypeScript,
  decorators are functions that can be used to modify or annotate classes, methods, properties, or parameters at design
  time. Metadata, in this context, refers to additional information associated with these elements.

```shell
npm i reflect-metadata
```

## Install Zod

- Zod is a library that provides a fluent and expressive API for defining and validating data schemas in TypeScript. It
  allows you to define schemas for your data structures using a familiar and intuitive syntax, and then use those
  schemas to validate input data at runtime.

```shell
npm i zod
```

</details>

# 4. Application Folder Structure

<details>

```shell
mkdir src
vim src/main.ts
```

## Copy the following basic frame of application

```ts
import express, {Application, NextFunction, Request, Response} from "express";

console.log("===> Hello, the backend server is starting ...");

const port: number = 5000;

// this application is an express application
class App {
    public app: Application;

    /**
     * the construction of App class, init db, plugin and routes
     */
    constructor() {
        this.app = express();
        this.routes();
    }

    /**
     * url routes settings
     * @protected
     */
    protected routes(): void {
        this.app.route("/").get((req: Request, res: Response) => {
            res.send("welcome home");
        });
    }
}

// new application instance
const app = new App().app;

// ===start the backend express service application at 3000 port=== //
app.listen(port, () => {
    console.log("===> Application is listening at http://localhost:" + port);
})

```

</details>

# 5. Configure script part in package.json to prepare running and build

<details>

```json
{
  "scripts": {
    "dev": "nodemon ./build/app.js",
    "tsNodeDev": "ts-node-dev --respawn --transpile-only src/app.ts",
    "debug": "ts-node-dev --inspect=localhost:9229 src/app.ts",
    "start-dev": "tsc && yarn dev",
    "build": "tsc"
  }
}
```

</details>

# 6. Finally Run the app

<details>

```shell
npm run tsNodeDev
```

</details>

# 7. Middleware Operations

<details>

## routing middleware

```shell
app.METHOD(PATH, HANDLER)
```

- [Official Routing Reference](https://expressjs.com/en/guide/routing.html)
- [METHOD](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)
    - HEAD
    - OPTIONS
    - TRACE
    - PATCH
- PATH is a path on the server like
    - '/'
    - '/users'
    - '/ab?cd'
    - '/ab+cd'
    - '/ab*cd'
    - '/ab(cd)?e'
    - '/a/'
    - '/.*fly$/'
    - [Path-to-RegExp](https://www.npmjs.com/package/path-to-regexp)
    - Parameters
        - res.send(req.params)
        - path parameters
          ```text
              Route path: /users/:userId/books/:bookId
              Request URL: http://localhost:3000/users/34/books/8989
              req.params: { "userId": "34", "bookId": "8989" }
          ```
- HANDLER is the callback function executed when the route is matched
  - (req, res) => {res.send('Hello from A!')}
  - call next
    ```ts
     (req, res, next) => {
                          console.log('the response will be sent by the next function ...');
                          next();
                        }, 
                        (req, res) => {
                          res.send('Hello from B!');
                        };
    ```
  - An array of callback next functions
- Response methods
- app.route()  
- express.Router  
- Others References:
  - [route-map : Organizing routes using a map](https://github.com/expressjs/express/blob/master/examples/route-map/index.js)
  - [route-middleware:Working with route middleware](https://github.com/expressjs/express/blob/master/examples/route-middleware/index.js)
  - [route-separation:Organizing routes per each resource](https://github.com/expressjs/express/tree/master/examples/route-separation)
  - [Reference: Express JS - Router and Routes](https://www.youtube.com/watch?v=iM_S4RczozU)

## [Serving static files in Express](https://expressjs.com/en/starter/static-files.html)

```ts
// signature
express.static(root, [options])
// example
app.use(express.static('public'))
```

## GlobalMiddleware for Authentication

</details>

# 8. Error Handling

<details>

Always using async function inside try catch

```js
    app.get("/error", async (req, rsp) => {
    try {
        await throwsError();
        rsp.sendStatus(200);
    } catch (e: any) {
        //rsp.sendStatus(400);
        rsp.status(400).send("Something bad happened: " + e.message);
    }
});
```

</details>

# 9. Security Handling

<details>

add helmet as the middleware to protect response headers

</details>

# 10. Testing

<details>

Unit Test
Integration Test
End-to-End Test

</details>

# 11. What are drawbacks?

<details>

</details>

# 12. Using Express application generator to to quickly create a new  application skeleton

<details>

```shell
npx express-generator
```

</details>

# 13. References:

<details>

[Express JS Full Course](https://www.youtube.com/watch?v=nH9E25nkk3I)  
[Express JS - Router and Routes](https://www.youtube.com/watch?v=iM_S4RczozU)  
[Important! Running and debugging TypeScript](https://www.jetbrains.com/help/webstorm/running-and-debugging-typescript.html#ws_ts_run_debug_server_side_ts_node)   
[Exploring the HTTP request syntax](https://www.jetbrains.com/help/webstorm/exploring-http-syntax.html#access-web-service-with-authentication)   
[Running and debugging TypeScript](https://www.jetbrains.com/help/webstorm/running-and-debugging-typescript.html#ws_ts_run_debug_server_side)    
[Compiling TypeScript into JavaScript](https://www.jetbrains.com/help/webstorm/compiling-typescript-to-javascript.html)

</details>

# 14. Exceptions

<details>
- error: Use ES modules throughout: You can convert all your files to use ES module syntax. This includes using import
  and export instead of require() and module.exports. If you're using TypeScript, you'll also need to configure it to
  output ES modules.
    - solution: To do this, ensure your tsconfig.json has "module": "ESNext" or "module": "ES6", and remove "type": "
      module" from your package.json.


</details>