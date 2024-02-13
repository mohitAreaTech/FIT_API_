const { DataTypes } = require('sequelize');

const sequelize = require('../utils/database');

const pos = sequelize.define("pos", {
    userName: {
        type: DataTypes.STRING,
    },
    isTrainee: {
        type: DataTypes.BOOLEAN,
        defaultValue: null
    },
    status: {
        type: DataTypes.ENUM('pending', "accepted", "rejected", "incomplete", "certified", "underTraining", "complete-exam", "complete-training"),
        defaultValue: "pending"
    },
    reject_remark: {
        type: DataTypes.STRING
    },
    CertificationCompletedAt: {
        type: DataTypes.DATE
    },
    trainingStartedAt: {
        type: DataTypes.DATE,
    },
    trainingEndedAt: {
        type: DataTypes.DATE
    },
    certifiedPosID: {
        type: DataTypes.STRING,
        // primaryKey: true,
        allowNull: true
    },
    buttonVisibleTime: {
        type: DataTypes.DATE,
    },
})

module.exports = pos;