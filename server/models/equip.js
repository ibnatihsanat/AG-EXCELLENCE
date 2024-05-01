// models/equipment.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Equipment = sequelize.define('Equipment', {
    image: {
        type: DataTypes.STRING, // Assuming you'll store the file path as a string
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contact: {
        type: DataTypes.STRING,
        allowNull: false
    },
    owner: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Equipment;
