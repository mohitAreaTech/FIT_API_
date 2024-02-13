const {DataTypes} = require('sequelize');

const sequelize = require('../utils/database');

const Employee = sequelize.define("employee_table", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    },
    username: { 
        type: DataTypes.STRING,
      allowNull: true,  
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    designation: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    department: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    role: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    zoneid: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    stateid: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    reportingManager: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM('active', 'deactive'),
        allowNull: false,
    }
    
},{timestamps: true})

sequelize.sync();

module.exports = Employee;