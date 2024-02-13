const { DataTypes } = require('sequelize');

const sequelize = require('../utils/database');

const pincode_data = sequelize.define("pincode_data", {
    Pin_Code : {
        type : DataTypes.DOUBLE
    },
    City :{
        type : DataTypes.STRING
    },
    District:{
        type : DataTypes.STRING
    },
    State : {
        type : DataTypes.STRING
    }
},{timestamps : false})

module.exports = pincode_data;