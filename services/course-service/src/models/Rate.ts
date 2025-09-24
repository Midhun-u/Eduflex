import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize";

export const Rate = sequelize.define("Rating", {

    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true,
    },
    courseId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false,
    }, 
    comment: {
        type: DataTypes.TEXT,
    },
    rate: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate : {
            min : 1,
            max : 5
        }
    }
}, {
    tableName: "ratings", indexes: [
        {
            unique: true,
            fields: ['id']
        },
        {
            name : "course_id",
            fields : ['courseId']
        },
        {
            name : "user_id",
            fields : ['userId']
        }
    ]
})