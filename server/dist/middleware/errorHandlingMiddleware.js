export const errorHandlingMiddleware = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Something went wrong";
    res.status(statusCode).send({ success: false, message: "Something went wrong " });
};
