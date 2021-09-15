import { Request, Response } from "express";
import { injectable } from "tsyringe";
import CreateUserService from "../services/CreateUserService";
import { HTTP } from "../utils/constants";

@injectable()
export default class CustomerController {
    constructor(private createUserService: CreateUserService) { }

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

        const customer = await this.createUserService.execute({
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
