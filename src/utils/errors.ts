import { HTTP } from "./constants";

export class HTTPException extends Error {
    name: string;
    statusCode: HTTP;

    constructor(message: string, statusCode: HTTP) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
    }
}

// Error class for business logic errors
export class AppError extends HTTPException {
    name: string;

    constructor(message: string, statusCode: HTTP = 400) {
        super(message, statusCode);
        this.name = this.constructor.name;
    }
}
