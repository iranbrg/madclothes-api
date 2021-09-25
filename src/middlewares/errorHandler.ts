import { NextFunction, Request, Response } from "express";
import { HTTP } from "../utils/constants";
import { AppError, HTTPException } from "../utils/errors";

export default function errorHandler(
    err: HTTPException,
    req: Request,
    res: Response,
    next: NextFunction
): void {
    console.error(err.stack);

    const status = "error";
    let code = HTTP.InternalServerError;
    let message = "Internal Server Error";

    if (err instanceof AppError) {
        code = err.statusCode;
        message = err.message;
    }

    res.status(code).json({
        status,
        code,
        message
    });
}
