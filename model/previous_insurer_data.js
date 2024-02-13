const {DataTypes} = require('sequelize');

const sequelize = require('../utils/database');

const previous_insurer_data = sequelize.define("previous_insurer_data",{
    Digit_Code : {
        type : DataTypes.STRING
    },
    Name : {
        type : DataTypes.STRING
    }
})

module.exports = previous_insurer_data;