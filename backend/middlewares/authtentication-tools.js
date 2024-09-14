import { jwt } from "jsonwebtoken";
import { AuthTokenModel } from "../models";

export class AuthenticationMiddleware {
    static async verifyToken(request, response, next) {
        let authorization = request.headers["authorization"];

        if (!authorization) {
            return response.status(401).json({
                status: 401,
                message: 'Not authorized',
            });
        }

        let token = authorization.split(' ')[1]

        if (!token) {
            return response.status(401).json({
                status: 401,
                message: 'Not authorized',
            });
        }

        const findedToken = await AuthTokenModel.findOne({
            where: {
                key: token,
            },
        });

        if (findedToken) {
            jwt.verify(
                token,
                "IdOnTkNoW", //secret token
                (error, decoded) => {
                    if (error) {
                        return response.status(401).json({
                            status: 401,
                            message: 'Not authorized',
                        });
                    }

                    request.user = decoded;

                    next();
                }
            );
        } else {
            return response.status(401).json({
                status: 401,
                message: 'Not authorized',
            });
        }
    }


}
