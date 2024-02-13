const sequelize = require("../utils/database");
const {  DataTypes } = require("sequelize");

const examAttempts = sequelize.define("exam_attempts", {
  attempt_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: "1",
  },
  status: {
    type: DataTypes.ENUM("started", "ended"),
    defaultValue: "started",
  },
  attempt_result: {
    type: DataTypes.TEXT,
    allowNull: true,
    get() {
      const rawValues = this.getDataValue("attempt_result");
      return rawValues ? JSON.parse(rawValues) : null;
    },
  },
  result :{
      type : DataTypes.ENUM("pass" , "fail")
  }
});

module.exports = examAttempts;
