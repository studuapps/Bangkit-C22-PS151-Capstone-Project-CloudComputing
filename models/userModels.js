/*
  IMPORT MODULE DATABASE AND SEQUELIZE
*/
const Sequelize = require("sequelize");
const db = require("../utils/database");

// DATA TYPES
const { DataTypes } = Sequelize;

// Calculations models database
const Users = db.define(
  "users",
  {
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    refresh_token: {
      type: DataTypes.TEXT,
    },
    gender: {
      type: DataTypes.STRING,
    },
    date_of_birth: {
      type: DataTypes.DATEONLY,
    },
    phone_number: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true,
  }
);

(async () => {
  await db.sync();
})();

module.exports = Users;
