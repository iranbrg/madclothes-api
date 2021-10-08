import { Router } from "express";
import { container } from "tsyringe";
import AdminController from "../../controllers/AdminController";
import { adminSchema, validate } from "../../middlewares/validate";

const router = Router();

router.post("/", validate(adminSchema, "body"), async (req, res) => {
    const adminController = container.resolve(AdminController);
    await adminController.create(req, res);
});

export default router;
