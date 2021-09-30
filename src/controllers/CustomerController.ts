import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import IUserRepository from "../repositories/IUserRepository";
import CreateUserService from "../services/CreateUserService";
import GetCustomerService from "../services/GetCustomerService";
import ListCustomersService from "../services/ListCustomersService";
import { HTTP } from "../utils/constants";

@injectable()
export default class CustomerController {
    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository,

        private createUserService: CreateUserService,
        private listCustomersService: ListCustomersService,
        private getCustomerService: GetCustomerService,
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
        let page = Number(req.query.page);
        let limit = Number(req.query.limit);

        const total = await this.userRepository.countCustomers();
        const lastPage = Math.ceil(total / limit);
        page = page > lastPage ? lastPage : page;

        const customers = await this.listCustomersService.execute({ page, limit });

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
