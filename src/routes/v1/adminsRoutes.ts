import { Router } from "express";
import { container } from "tsyringe";
import AdminController from "../../controllers/AdminController";

const router = Router();

router.post("/", async (req, res) => {
    const adminController = container.resolve(AdminController);
    await adminController.create(req, res);
});

export default router;
