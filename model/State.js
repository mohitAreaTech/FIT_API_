const { DataTypes } = require('sequelize');

const sequelize = require('../utils/database');

const State = sequelize.define("state", {
    state : {
        type : DataTypes.STRING,
    }
    
})

module.exports = State;