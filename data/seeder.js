require("dotenv").config();
const fs = require("fs");
const Customer = require("../models/carModels");

const cars = JSON.parse(fs.readFileSync(`${__dirname}/cars.json`, "utf-8"));

const importData = async () => {
  try {
    await Customer.create(cars);
    console.log("Data Import Succesfully");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const clearData = async () => {
  try {
    await Customer.deleteMany();
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
