import "reflect-metadata";
import "express-async-errors";
import { config } from 'dotenv';

config({ path: process.env.NODE_ENV === "test" ? ".env.test" : ".env" })

import "./container";
import express, { Application } from "express";
import router from "./routes";
import errorHandler from "./middlewares/errorHandler";

class App {
    public express: Application;

    constructor() {
        this.express = express();

        this.middlewares();
        this.routes();
        this.errorHandling();
    }

    private middlewares(): void {
        this.express.use(express.json());
    }

    private routes(): void {
        this.express.use(router);
    }

    private errorHandling(): void {
        this.express.use(errorHandler);
    }
}

export default new App().express;
