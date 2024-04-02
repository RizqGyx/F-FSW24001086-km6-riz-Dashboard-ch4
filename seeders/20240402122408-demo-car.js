"use strict";
const fs = require("fs");
const cars = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/car.json`, "utf-8")
);

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Cars", cars, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Cars", null, {});
  },
};
