const { StatusCodes } = require("http-status-codes");
const sendResponse = require("../../shared/sendResponse");

const requestValidator = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse({
            body: req.body,
            query: req.query,
            params: req.params,
            cookies: req.cookies,
        });

        if (!result.success) {
            sendResponse(res, {
                statusCode: StatusCodes.BAD_REQUEST,
                status: "failed",
                message: "Request validation error!",
                data: result.error.errors
            })
        }

        return next();
    };
};

module.exports = requestValidator;
