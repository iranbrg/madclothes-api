import "reflect-metadata";
import "express-async-errors";
import { config } from "dotenv";
import cors from "cors";


import "./container";
import express, { Application } from "express";
import router from "./routes";
import errorHandler from "./middlewares/errorHandler";

config({ path: process.env.NODE_ENV === "test" ? ".env.test" : ".env" });

class App {
    public express: Application;

    constructor() {
        this.express = express();

        this.middlewares();
        this.routes();
        this.errorHandling();
    }

    private middlewares(): void {
        this.express.use(cors({
            origin: "*",
            optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
        }));
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
