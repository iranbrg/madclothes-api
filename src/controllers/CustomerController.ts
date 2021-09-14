import { Request, Response } from "express";
import CreateUserService from "../services/CreateUserService";
import { HTTP } from "../utils/constants";

export default class CustomerController {
    public async create(req: Request, res: Response): Promise<void> {
        const {
            firstName,
            lastName,
            email,
            password,
            birthdate,
            phoneNumber,
            cpf,
            zipCode,
            isAdmin
        } = req.body;

        const createUserService = new CreateUserService();

        const customer = await createUserService.execute({
            firstName,
            lastName,
            email,
            password,
            birthdate,
            phoneNumber,
            cpf,
            zipCode,
            isAdmin
        });

        res.status(HTTP.Created).json({ status: "success", data: { customer } });
    }
}
