import createHttpError from "http-errors";

export const canAccess = (roles) => {
    return (req, res, next) => {
        const roleFromToken = req.user?.role;
        if (!roles.includes(roleFromToken)) {
            const error = createHttpError(
                403,
                "You don't have enough permissions!",
            );
            return next(error);
        }

        next();
    };
};
