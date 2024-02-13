const { DataTypes } = require('sequelize');

const sequelize = require('../utils/database')

const Notification = sequelize.define('Notification', {
    message : {
        type : DataTypes.STRING
    }
})

module.exports = Notification