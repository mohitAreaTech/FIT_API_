const { DataTypes } = require('sequelize');

const sequelize = require('../utils/database');

const leadtype = sequelize.define("leadtype", {
    type :{
        type : DataTypes.STRING,
        allowNull : false
    }
})

module.exports = leadtype;