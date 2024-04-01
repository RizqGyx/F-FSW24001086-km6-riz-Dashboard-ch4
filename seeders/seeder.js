require("dotenv").config();
const fs = require("fs");
const Car = require("../models/carModels");

const cars = JSON.parse(fs.readFileSync(`${__dirname}/car.json`, "utf-8"));

const importData = async () => {
  try {
    await Car.create(cars);
    console.log("Data Import Succesfully");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const clearData = async () => {
  try {
    await Car.deleteMany();
    console.log("Data Delete Succesfully");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const argv = process.argv[2];
if (argv === "--import") {
  importData();
}

if (argv === "--delete") {
  clearData();
}
