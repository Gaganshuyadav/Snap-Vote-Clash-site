import { z} from "zod";

//clash schema
export const clashSchema = z.object({
    title: z.string({ message:"title is required"})
                .min(2, { message:"title must be 2 characters long"})
                .max(100, { message:"title must be less than 100 characters long"}),
    description: z.string({ message:"description is required"})
                .min(2, { message:"description must be 2 characters long"})
                .max(500, { message:"description must be less than 500 characters long"}),
    
}) 






