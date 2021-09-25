import { Router } from "express";
import notFoundRoutes from "./notFoundRoutes";
import customersRoutes from "./customersRoutes";
import adminsRoutes from "./adminsRoutes";

const router = Router();

router.use("/customers", customersRoutes);
router.use("/admins", adminsRoutes);

router.use(notFoundRoutes);

export default router;
