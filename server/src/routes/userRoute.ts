import { NextFunction, Router} from "express";
import { userController } from "../controllers/userController.js";
import { authentication } from "../middleware/authentication.js";

const router = Router();


router.post("/register", userController.register);

router.post("/login-check", userController.loginCheck);
router.post("/login", userController.login);

router.get("/get-user", authentication, userController.getUser);

router.get("/verify-email", userController.verifyEmail);

router.get("/verification-error", userController.verifyEmailError);


export default router;


