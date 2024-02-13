const {DataTypes} = require('sequelize');

const sequelize = require('../utils/database');

const Nominee = sequelize.define("nominee",{
    relation : {
        type : DataTypes.STRING
    }
},{timestamps : false})

module.exports = Nominee;