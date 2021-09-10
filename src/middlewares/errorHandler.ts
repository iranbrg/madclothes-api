import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/errors";

export default function errorHandler(
    err: AppError,
    req: Request,
    res: Response,
    next: NextFunction
): void {
    console.error(err.stack);

    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            status: "error",
            code: err.statusCode,
            message: err.message
        });

        return;
    }

    res.status(500).json({
        status: "error",
        code: 500,
        message: "Internal Server Error"
    });
}
