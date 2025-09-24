import { DataTypes } from "sequelize"
import { sequelize } from "../config/sequelize"

//course schema
export const Course = sequelize.define("Course", {

    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    language: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    thumbnail: {
        type: DataTypes.JSONB,
        allowNull: false
    },
    previewLink: {
        type: DataTypes.STRING,
        allowNull: false
    },
    keypoints: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
        allowNull: false
    },
    chapters: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
        allowNull: false
    },
    chapterNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    }, 
    educator: {
        type: DataTypes.JSONB, 
        allowNull: false
    },

}, { 
    indexes: [
        {
            unique: true,
            fields: ['id']
        },
        {
            name: 'category_index',
            fields: ['category']
        },
    ],
    tableName : "courses"
})