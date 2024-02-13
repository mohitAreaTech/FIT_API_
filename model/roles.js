const {DataTypes} = require('sequelize');

const sequelize = require('../utils/database');

const Roles = sequelize.define("roles_table", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    role_name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

sequelize.sync();

module.exports = Roles;