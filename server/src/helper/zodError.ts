import { ZodError } from "zod";

const formatErrors = ( error:ZodError) =>{
    const errors = error.issues.map((err)=>{
        return { [err.path[0]]: err.message };
    })
    return errors;
};

export {formatErrors }