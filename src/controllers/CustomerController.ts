import { Request, Response } from "express";
import { injectable } from "tsyringe";
import CreateUserService from "../services/CreateUserService";
import GetCustomerService from "../services/GetCustomerService";
import ListCustomersService from "../services/ListCustomersService";
import { HTTP } from "../utils/constants";

@injectable()
export default class CustomerController {
    constructor(
        private createUserService: CreateUserService,
        private listCustomersService: ListCustomersService,
        private getCustomerService: GetCustomerService
    ) { }

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

        res.status(HTTP.Created).json({
            status: "success",
            data: { customer }
        });
    }

    public async index(req: Request, res: Response): Promise<void> {
        let page = Number(req.query.page) || 1;
        let limit = Number(req.query.limit) || 10;

        const [customers, total] = await this.listCustomersService.execute({ page, limit });

        const lastPage = Math.ceil(total / limit);

        res.status(HTTP.Ok).json({
            status: "success",
            page,
            limit,
            lastPage,
            data: { customers }
        });
    }

    public async show(req: Request, res: Response): Promise<void> {
        const { customerId } = req.params;

        const customer = await this.getCustomerService.execute({ customerId });

        res.status(HTTP.Ok).json({
            status: "success",
            data: { customer }
        });
    }
}
