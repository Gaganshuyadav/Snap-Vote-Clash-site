import { Router } from "express";
import userRoute from "./userRoute.js";
import clashRoute from "./clashRoute.js";
const router = Router();
router.use("/user", userRoute);
router.use("/clash", clashRoute);
export default router;
