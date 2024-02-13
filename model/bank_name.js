const { DataTypes } = require('sequelize');

const sequelize = require('../utils/database');

const Bank_name = sequelize.define("bank_name", {
  bank_name : {
      type : DataTypes.STRING
  }
  
})

module.exports = Bank_name;