const { DataTypes } = require('sequelize');

const sequelize = require('../utils/database')

const addons = sequelize.define('addons', {
    addons :{
        type : DataTypes.STRING
    }
})

module.exports = addons