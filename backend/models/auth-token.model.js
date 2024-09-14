import { Model } from "sequelize";

export class AuthTokenModel extends Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                key: {
                    type: DataTypes.TEXT,
                    field: 'key',
                    primaryKey: true,
                },
                created: {
                    type: DataTypes.DATE,
                    field: 'created',
                },
                user_id: {
                    type: DataTypes.INTEGER,
                    field: 'user_id',
                    references: {
                        model: 'User',
                        key: 'id',
                    },
                },
            },
            {
                sequelize,
                paranoid: false,
                modelName: 'AuthToken',
                tableName: 'auth_token',
                freezeTableName: true,
                timestamps: false,
            }
        );
    }
}
