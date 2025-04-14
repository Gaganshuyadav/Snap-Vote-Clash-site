import { z } from "zod";
//register schema
const registerSchema = z.object({
    name: z.string({ message: "Name is required" })
        .min(3, "Name must be 3 characters long"),
    email: z.string({ message: "Email is required" })
        .email({ message: "Please type correct email" }),
    password: z.string({ message: "Password is required" })
        .min(3, { message: "Password must have at least 4 characters" }),
    confirm_password: z.string({ message: "Confirm Password is required" })
}).refine((data) => {
    if (data.password !== data.confirm_password) {
        return false;
    }
    else {
        return true;
    }
}, { message: "password and confirm password should be same", path: ["confirm_password"] });
//login schema
const loginSchema = z.object({
    email: z.string({ message: "Email is required" })
        .email({ message: "Email must be in correct format" }),
    password: z.string({ message: "Password is required" })
});
export { registerSchema, loginSchema };
