
import {Application} from "express";

function routeSomething(app: Application) {

    /**
     * using RegExp for path
     * - "/abc" - /abc
     * - "/ab?cd" -
     * - "/ab+cd"
     * - "/ab*cd"
     * - "/a/"
     * - "/.*man$/" - anything that ends with "man"
     * - "^" - start with ...
     */

    app.route("/things/cars")
        .get((req,res)=>{})
        .post((req,res)=>{});

    app.route("/things/cars/:carId")
        .get((req,res)=>{})
        .post((req,res)=>{});

}

export default routeSomething;