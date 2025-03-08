import { User } from "../models/userModel.js";

class AuthService {
    async registerUser(user) {
        return await User.create(user);
    }

    async getUserByEmail(email) {
        return await User.findOne({ email });
    }

    async getUserById(id) {
        return await User.findById(id).select("-password -refreshToken -__v");
    }
}

export const authService = new AuthService();
