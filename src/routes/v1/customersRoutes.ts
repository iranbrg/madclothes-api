import { Router } from "express";
import { container } from "tsyringe";
import CustomerController from "../../controllers/CustomerController";
import { customerSchema, userIdSchema, paginationSchema, validate } from "../../middlewares/validate";

const router = Router();

router.get("/", validate(paginationSchema, "query"), async (req, res) => {
    const customerController = container.resolve(CustomerController);
    await customerController.index(req, res);
});

router.get("/:customerId", validate(userIdSchema, "params"), async (req, res) => {
    const customerController = container.resolve(CustomerController);
    await customerController.show(req, res);
});

router.post("/", validate(customerSchema, "body"), async (req, res) => {
    const customerController = container.resolve(CustomerController);
    await customerController.create(req, res);
});

export default router;
