"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Traduction = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class Traduction extends sequelize_1.Model {
}
exports.Traduction = Traduction;
Traduction.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
    },
    text: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    language: {
        type: sequelize_1.DataTypes.ENUM('english', 'español'),
        primaryKey: true,
    },
}, {
    sequelize: database_1.sequelize,
    modelName: 'traduction',
    timestamps: false,
});
