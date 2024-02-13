const {DataTypes} = require('sequelize');

const sequelize = require('../utils/database');

const Transaction = sequelize.define("transaction",{
    amount :{
        type : DataTypes.STRING
    },
    transaction_proof :{
        type : DataTypes.STRING
    },
    transactionId : {
        type : DataTypes.STRING
    }
})

module.exports = Transaction;