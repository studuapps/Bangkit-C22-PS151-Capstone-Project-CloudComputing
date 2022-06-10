/*
  IMPORT MODULE DATABASE AND SEQUELIZE
*/
const Sequelize = require("sequelize");
const db = require("../utils/database");

// DATA TYPES
const { DataTypes } = Sequelize;

// Articles models database
const Articles = db.define(
  "articles",
  {
    title: {
      type: DataTypes.STRING,
    },
    writer: {
      type: DataTypes.STRING,
    },
    release_date: {
      type: DataTypes.DATEONLY,
    },
    content: {
      type: DataTypes.TEXT("long"),
    },
    abstract: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

(async () => {
  await db.sync();
})();

module.exports = Articles;
