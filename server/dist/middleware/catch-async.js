//higher order functions
const catchAsyncErrors = (fn) => {
    return function (req, res, next) {
        fn(req, res, next).catch((err) => next(err));
    };
};
class errorHandler extends Error {
    constructor(message, statusCode) {
        super();
        this.message = message;
        this.statusCode = statusCode;
    }
}
export { catchAsyncErrors, errorHandler };
