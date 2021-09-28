import { Router } from "express";
import v1 from "./v1";
import notFound from "./notFound";

const router = Router();

router.use("/v1", v1);

router.use(notFound);

export default router;
