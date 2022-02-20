import { Model, DataTypes } from "sequelize";
import { sequelize } from "../instances/mysql";

export interface AdInstance extends Model {
    id: number,
    idUser: number,
    title: string,
    id_category: number,
    price: number,
    priceNegotiable: boolean,
    description: string,
    views: number,
    status: boolean,
    id_state: number,
    dateCreated: Date
}

export const Ad = sequelize.define<AdInstance>('Ad', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    idUser: {
        type: DataTypes.INTEGER
    },
    title: {
        type: DataTypes.STRING
    },
    id_category: {
        type: DataTypes.INTEGER
    },
    price: {
        type: DataTypes.DECIMAL
    },
    priceNegotiable: {
        type: DataTypes.BOOLEAN
    },
    description: {
        type: DataTypes.STRING
    },
    views: {
        type: DataTypes.INTEGER
    },
    status: {
        type: DataTypes.BOOLEAN
    },
    id_state: {
        type: DataTypes.INTEGER
    },
    dateCreated: {
        type: DataTypes.DATE,
    }
},{
    tableName: 'ads',
    timestamps: false
})