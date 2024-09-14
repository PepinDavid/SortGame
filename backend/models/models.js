import { Sequelize } from "sequelize";
import { postgres_config } from "../config/db.config";

export const sequelize = new Sequelize(
    postgres_config.DB,
    postgres_config.USER,
    postgres_config.PASSWORD,
    {
        host: postgres_config.HOST,
        dialect: postgres_config.DIALECT,
        port: postgres_config.PORT,
        pool: postgres_config.POOL,
        logging: false,
    },
);
