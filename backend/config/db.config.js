import ini from "ini";
import fs from "fs";
import process from "process";

const config = ini.parse(fs.readFileSync(process.env.NODE_CONFIG_DIR + '/config.ini', 'utf-8'));

export const postgres_config = {
    HOST: config.POSTGRES.DB_HOST,
    PORT: config.POSTGRES.DB_PORT,
    USER: config.POSTGRES.DB_USER,
    PASSWORD: config.POSTGRES.DB_PASSWORD,
    DB: config.POSTGRES.DB_DATABASE,
    DIALECT: "postgres",
    POOL: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    }
};
