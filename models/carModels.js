const Sequelize = require("sequelize");
const DB = require("../config/database");

const { DataTypes } = Sequelize;

const Cars = DB.define(
  "cars",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rent_per_day: {
      type: DataTypes.DECIMAL(10, 2),
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

module.exports = Cars;

(async () => {
  await DB.sync();
})();
