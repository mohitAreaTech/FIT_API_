const { DataTypes } = require('sequelize');

const sequelize = require('../utils/database');

const District = sequelize.define("district", {
    district : {
        type : DataTypes.STRING,
    }
    
})

module.exports = District;