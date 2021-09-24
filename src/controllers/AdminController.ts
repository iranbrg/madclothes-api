import { Request, Response } from "express";
import { injectable } from "tsyringe";
import CreateUserService from "../services/CreateUserService";
import { HTTP } from "../utils/constants";

@injectable()
export default class AdminController {
    constructor(private createUserService: CreateUserService) {}

    public async create(req: Request, res: Response): Promise<void> {
        const { firstName, lastName, email, password, isAdmin } = req.body;

        const admin = await this.createUserService.execute({
            firstName,
            lastName,
            email,
            password,
            isAdmin
        });

        res.status(HTTP.Created).json({ status: "success", data: { admin } });
    }
}
