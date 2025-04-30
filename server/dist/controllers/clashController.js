import { clashSchema } from "../validations/clashValidations.js";
import { formatErrors } from "../helper/zodError.js";
import { ZodError } from "zod";
import { catchAsyncErrors, errorHandler } from "../middleware/catch-async.js";
import { imageValidator } from "../validations/imageValidator.js";
import { prisma } from "../prisma-client/PrismaClient.js";
class ClashController {
    constructor() {
        this.createNewClash = catchAsyncErrors(async (req, res, next) => {
            const { title, description, expired_at } = req.body;
            //validate req.body  
            try {
                clashSchema.parse(req.body);
            }
            catch (err) {
                if (err instanceof ZodError) {
                    formatErrors(err);
                    return res.status(422).json({ errorName: "Validation Failed", errors: formatErrors(err) });
                }
            }
            // validate image ( req.file)
            if (!req.file) {
                return next(new errorHandler("Image Not Provided", 422));
            }
            const imageValidate = imageValidator(req.file.mimetype, req.file.size);
            if (!imageValidate.valid) {
                return next(new errorHandler(imageValidate.message, 422));
            }
            //convert buffer to image url
            let imageURL = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
            //now add clash in schema 
            try {
                console.log("come closer.. ", expired_at);
                const newClash = await prisma.clash.create({
                    data: {
                        user_id: req.user?.userId,
                        image: imageURL,
                        title: title,
                        description: description,
                        expired_at: new Date(expired_at).toISOString()
                    }
                });
                return res.status(201).json({
                    success: true,
                    data: {
                        id: newClash.id,
                        user_id: req.user?.userId,
                        image: imageURL,
                        ...req.body,
                        expired_at: new Date().toISOString()
                    }
                });
            }
            catch (err) {
                console.log(err);
                res.status(500).json({
                    success: true,
                    message: "Something went wrong in serverr"
                });
            }
        });
        this.getAllClashes = catchAsyncErrors(async (req, res, next) => {
            const allClashes = await prisma.clash.findMany({ where: { user_id: req.user?.userId } });
            //remove image 
            const withOutImage = allClashes?.map(({ ["image"]: _, ...rest }) => rest);
            return res.status(200).json({
                success: true,
                data: allClashes
            });
        });
        this.getClash = catchAsyncErrors(async (req, res) => {
            const clash = await prisma.clash.findUnique({
                where: { id: req.params.id },
                select: {
                    id: true,
                    title: true,
                    description: true,
                    clashItems: {
                        select: {
                            id: true,
                            count: true,
                            image: true
                        }
                    },
                    comments: {
                        select: {
                            content: true,
                            id: true,
                            created_at: true
                        }
                    }
                }
            });
            if (!clash) {
                return res.status(404).json({
                    success: false,
                    message: "Not Found"
                });
            }
            return res.status(200).json({
                success: true,
                data: clash
            });
        });
        this.updateClash = catchAsyncErrors(async (req, res, next) => {
            //if image exist
            if (req.file) {
                const imageValidate = imageValidator(req.file.mimetype, req.file.size);
                if (!imageValidate.valid) {
                    return next(new errorHandler(imageValidate.message, 422));
                }
                //convert buffer to image url
                const imageURL = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
                await prisma.clash.update({
                    where: {
                        id: req.params.id
                    },
                    data: {
                        image: imageURL,
                        ...req.body
                    }
                });
            }
            else {
                //if image not exist
                await prisma.clash.update({
                    where: {
                        id: req.params.id
                    },
                    data: {
                        ...req.body
                    }
                });
            }
            return res.status(200).json({
                success: true,
                message: "clash updated successfully"
            });
        });
        this.deleteClash = catchAsyncErrors(async (req, res) => {
            await prisma.clash.delete({ where: { id: req.params.id } });
            return res.status(200).json({
                success: true,
                message: "clash deleted successfully"
            });
        });
        this.addClashItem = catchAsyncErrors(async (req, res, next) => {
            console.log(req);
            //clash id check
            if (!req.body.id) {
                return next(new errorHandler("Clash id not provided", 422));
            }
            const files = req.files;
            if (!files || files?.length < 1) {
                return next(new errorHandler("files not provided", 422));
            }
            // add clash items one by one in the ClashItems Promise one by one and also validate images 
            let clashItemPromiseForAll = [];
            try {
                for (let file of files) {
                    const imageValidate = imageValidator(file.mimetype, file.size);
                    if (!imageValidate.valid) {
                        return next(new errorHandler(imageValidate.message, 422));
                    }
                    //convert buffer to image url
                    const imageURL = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
                    clashItemPromiseForAll.push(prisma.clashItem.create({
                        data: {
                            clash_id: req.body.id,
                            image: imageURL
                        }
                    }));
                }
            }
            catch (err) {
                return next(new errorHandler("Something went wrong", 500));
            }
            //not add clash item by executing promise in db
            const data = await Promise.all(clashItemPromiseForAll);
            res.status(201).json({
                success: true,
                message: "Clash items successfully stored"
            });
        });
    }
}
export const clashController = new ClashController();
