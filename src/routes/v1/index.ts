import { Router } from "express";
import customersRoutes from "./customersRoutes";

const router = Router();

router.use("/customers", customersRoutes);

export default router;
