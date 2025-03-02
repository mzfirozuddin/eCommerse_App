import createHttpError from "http-errors";

export const asyncWrapper = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => {
            if (err instanceof Error) {
                return next(createHttpError(500, err.message));
            }

            return next(createHttpError(500, "Internal server error!!!"));
        });
    };
};
