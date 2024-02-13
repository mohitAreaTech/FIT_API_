const { DataTypes } = require("sequelize");

const sequelize = require("../utils/database");

const RTO = sequelize.define("rto_code", {
  registered_city_name: {
    type: DataTypes.STRING,
  },
  registered_state_name: {
    type: DataTypes.STRING,
  },
  RTO_Code: {
    type: DataTypes.STRING,
  },
  hdfc_4w: {
    type: DataTypes.STRING,
  },
  hdfc_2w: {
    type: DataTypes.STRING,
  },
});

module.exports = RTO;
