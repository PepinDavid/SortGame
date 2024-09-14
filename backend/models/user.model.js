import { Model } from "sequelize";

export class UserModel extends Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
            },
            {
                sequelize,
                paranoid: false,
                modelName: 'Game',
                tableName: 'game',
                timestamps: false,
            },
        );
    }
}
