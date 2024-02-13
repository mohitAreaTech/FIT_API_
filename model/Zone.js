const { DataTypes } = require('sequelize');

const sequelize = require('../utils/database');

const Zone = sequelize.define("zone", {
    zone : {
        type : DataTypes.STRING,
    }
    
})

module.exports = Zone;