import { Router } from "express";
import CustomerController from "../../controllers/CustomerController";

const router = Router();

const customerController = new CustomerController();

router.post("/", customerController.create);

export default router;
