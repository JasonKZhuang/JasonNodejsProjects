import {Router} from "express";
import IBaseRouter from "./IBaseRouter";


abstract class BaseRoutes implements IBaseRouter {
    public router: Router;

    constructor() {
        // initialize router variable
        this.router = Router();
        // call abstract routes method
        this.routes();
    }
    abstract routes(): void;
}

export default BaseRoutes;