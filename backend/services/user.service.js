import { UserModel } from "../models/user.model";

export class UserService {
    static async findById(id) {
        try {
            return await UserModel.findOne(
                {
                    where: {
                        id,
                    },
                    attributes: {
                        exclude: ['password'],
                    }
                },
            );
        } catch (e) {
            throw Error(e);
        }
    }
}