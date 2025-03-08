import { User } from "../models/userModel.js";

class AuthService {
    async registerUser(user) {
        return await User.create(user);
    }

    async getUserByEmail(email) {
        return await User.findOne({ email });
    }
}

export const authService = new AuthService();
