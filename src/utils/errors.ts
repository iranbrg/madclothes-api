export class AppError extends Error {
    readonly name: string;
    statusCode: number;

    constructor(message: string, statusCode: number = 400) {
        super(message);
        this.name = "AppError";
        this.statusCode = statusCode;
    }
}
