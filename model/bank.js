const { DataTypes } = require('sequelize');

const sequelize = require('../utils/database');

const bank = sequelize.define("bank", {
    accountNumber: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    bank_name : {
        type : DataTypes.STRING,
    },
    ifsc: {
        type: DataTypes.STRING,
        allowNull: false
    },
    passbookOrCheque: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = bank;