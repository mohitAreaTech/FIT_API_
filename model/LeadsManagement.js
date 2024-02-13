const { DataTypes } = require('sequelize');

const sequelize = require('../utils/database');

const LeadsManagementForSubmitOffline = sequelize.define("leads_management_submitOffline", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    lead_type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lead_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lead_generatedBy: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    lead_generated_for: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    lead_status: {
        type: DataTypes.ENUM('requestGenerated', 'leadAccepted', 'policyGenerated'),
        allowNull: true,
    },
    lead_pending_at: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    lead_data: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    lead_assignedTo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    posData: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    misData: {
        type: DataTypes.JSON,
        allowNull: true,
    }
}, { timestamps: true });

sequelize.sync();

module.exports = LeadsManagementForSubmitOffline;