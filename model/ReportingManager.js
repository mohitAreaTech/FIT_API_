const {DataTypes} = require('sequelize');

const sequelize = require('../utils/database');

const ReportingManager = sequelize.define("reporting_manager", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    rm_name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
    
})

sequelize.sync();

module.exports = ReportingManager;