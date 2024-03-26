const Sequelize = require("sequelize");
const DB = require("../config/database");

const { DataTypes } = Sequelize;

const Car = DB.define(
  "cars",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rent_per_day: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    size: {
      type: DataTypes.ENUM("Small", "Medium", "Large"),
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Car;

(async () => {
  await DB.sync();
})();
