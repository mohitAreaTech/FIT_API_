const {DataTypes} = require('sequelize');

const sequelize = require('../utils/database');

const Designation = sequelize.define("designations_table", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    designation_name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

sequelize.sync();

module.exports = Designation;