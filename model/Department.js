const {DataTypes} = require('sequelize');

const sequelize = require('../utils/database');

const Department = sequelize.define("department_table", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    department_name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

sequelize.sync();

module.exports = Department;