const { DataTypes } = require('sequelize');

const sequelize = require('../utils/database');

const User = sequelize.define("user", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
    },
    pan_number: {
        type: DataTypes.STRING,
    },  
    adhar_number: {
        type: DataTypes.STRING,
    },
    dob: {
        type: DataTypes.STRING,
    },
    profile_picture: {
        type: DataTypes.STRING,
    },
    access_token: {
        type: DataTypes.STRING,
    },
    fcm_token: {
        type: DataTypes.STRING,
    },
    type: {
        type: DataTypes.ENUM("pos", "admin", "pos_admin", "ops", "employee", 'mis', "service-provider", "national_head", 'zonal_head', "state_head", "district_head", "branch_head"),
        defaultValue: "pos"
    },
    // designation: {
    //     type: DataTypes.STRING,
    // },
    // department: {
    //     type: DataTypes.STRING,
    // },
    // role: {
    //     type: DataTypes.STRING,
    // },
    // zone: {
    //     type: DataTypes.STRING,
    // },
    isFirstLoggedIn: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isBlocked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    address: {
        type: DataTypes.STRING
    },
    address_2: {
        type: DataTypes.STRING
    },
    city: {
        type: DataTypes.STRING
    },
    state: {
        type: DataTypes.STRING
    },
})

module.exports = User;