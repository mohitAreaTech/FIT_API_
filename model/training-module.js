const { DataTypes } = require("sequelize");

const sequelize = require("../utils/database");

const training_module = sequelize.define("training_module", {
  module_title: {
    type: DataTypes.STRING,

  },
  module_description: {
    type: DataTypes.TEXT,
  },
  content: {
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.ENUM("0", "1"),
  },
});

module.exports = training_module;
