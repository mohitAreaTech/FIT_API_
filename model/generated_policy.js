const { DataTypes } = require('sequelize');

const sequelize = require('../utils/database');

const GeneratedPolicy = sequelize.define("generated_policy", {
    pos_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    policyNumber: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    insuranceCompany: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    MobileNumber: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    customerName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    policyType: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    PolicyGeneratedDate: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    policy_issued_pos: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    policyData: {
        type: DataTypes.JSON,
        allowNull: true,
    }
}, { timestamps: true });

sequelize.sync();

module.exports = GeneratedPolicy;