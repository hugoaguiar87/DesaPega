import { Model, DataTypes } from "sequelize";
import { sequelize } from "../instances/mysql";

export interface ImageInstace extends Model {
    id: number,
    id_ads: number,
    url: string,
    default: boolean,
    id_user: number
}

export const Image = sequelize.define('Image', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    id_ads: {
        type: DataTypes.INTEGER
    },
    url: {
        type: DataTypes.STRING
    },
    default: {
        type: DataTypes.BOOLEAN
    },
    id_user: {
        type: DataTypes.INTEGER
    }
}, {
    tableName:'ads_images',
    timestamps: false
})