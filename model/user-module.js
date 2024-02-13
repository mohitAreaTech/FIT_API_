const {DataTypes} = require('sequelize');

const sequelize = require('../utils/database');

const user_module = sequelize.define("user_module",{
   isCompleted:{
       type : DataTypes.BOOLEAN,
       defaultValue : false
   }
})

module.exports = user_module;