import { Router } from "express";
import { clashController } from "../controllers/clashController.js";
import { multerUpload } from "../middleware/multer.js";
import { authentication } from "../middleware/authentication.js";
const router = Router();


router.post("/create", authentication, multerUpload.single("image"), clashController.createNewClash );

router.get("/", authentication, clashController.getAllClashes);

router.get("/:id", clashController.getClash);

router.put("/:id", authentication, multerUpload.single("image"), clashController.updateClash);

router.delete("/:id", authentication, clashController.deleteClash);

router.post("/items", authentication, multerUpload.array("images",2), clashController.addClashItem);

export default router;

