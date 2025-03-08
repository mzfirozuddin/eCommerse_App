import { checkSchema } from "express-validator";

export default checkSchema({
    name: {
        errorMessage: "Name is required!",
        notEmpty: true,
        trim: true,
    },

    email: {
        errorMessage: "Email is required!",
        notEmpty: true,
        trim: true,
        isEmail: {
            errorMessage: "Email must be a valid email address!",
        },
    },

    phone: {
        errorMessage: "Mobile no is required!",
        notEmpty: true,
        trim: true,
        isLength: {
            options: { min: 10, max: 10 },
            errorMessage: "Mobile no should be 10 digit",
        },
    },

    address: {
        errorMessage: "Address is required!",
        notEmpty: true,
    },

    password: {
        errorMessage: "Password is required!",
        trim: true,
        notEmpty: true,
        isLength: {
            options: { min: 8 },
            errorMessage: "Password length should be at least 8 chars!",
        },
    },

    confirmPassword: {
        custom: {
            options: (value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error(
                        "Password and ConfirmPassword are not matched!",
                    );
                }

                return true;
            },
        },
    },
});
