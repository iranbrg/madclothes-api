import { Request, Response } from "express";
import CreateUserService from "../services/CreateUserService";
import { HTTP } from "../utils/constants";

export default class AdminController {
    public async create(req: Request, res: Response): Promise<void> {
        const { firstName, lastName, email, password, isAdmin } = req.body;

        const createUserService = new CreateUserService();

        const admin = await createUserService.execute({ firstName, lastName, email, password, isAdmin });

        res.status(HTTP.Created).json({ status: "success", data: { admin } });
    }
}
