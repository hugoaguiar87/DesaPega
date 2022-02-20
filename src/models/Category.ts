import { Model, DataTypes} from 'sequelize';
import { sequelize } from "../instances/mysql";

export interface CategoryInstance extends Model {
    id: number,
    name: string,
    slug: string
}

export const Category = sequelize.define<CategoryInstance>('Category', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING
    },
    slug: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'categories',
    timestamps: false
})