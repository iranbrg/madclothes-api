import { Router } from "express";
import { container } from "tsyringe";
import CustomerController from "../../controllers/CustomerController";

const router = Router();

router.post("/", async (req, res) => {
    const customerController = container.resolve(CustomerController);
    await customerController.create(req, res);
});

export default router;
