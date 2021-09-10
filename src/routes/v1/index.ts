import { Router } from "express";
import customersRoutes from "./customersRoutes";
import adminsRoutes from "./adminsRoutes";

const router = Router();

router.use("/customers", customersRoutes);
router.use("/admins", adminsRoutes);

export default router;
