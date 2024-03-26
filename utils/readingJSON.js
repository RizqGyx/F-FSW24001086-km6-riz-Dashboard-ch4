const fs = require("fs");

const cars = JSON.parse(fs.readFileSync(`${__dirname}/../data/cars.json`));

module.exports = { fs, cars };
