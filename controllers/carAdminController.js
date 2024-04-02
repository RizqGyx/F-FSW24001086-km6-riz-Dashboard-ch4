const { Car } = require("../models");
const { generateRandomId } = require("../utils/generateId");

const carPage = async (req, res) => {
  try {
    const cars = await Car.findAll();

    if (!cars) {
      res.render("error.ejs", { message: "Data Not Found", statusCode: 404 });
    }

    res.render("cars/index.ejs", {
      cars,
      message: req.flash("message", ""),
    });
  } catch (err) {
    res.render("error.ejs", { message: err.message, statusCode: 400 });
  }
};

const createCarPage = async (req, res) => {
  try {
    res.render("cars/create.ejs");
  } catch (err) {
    res.render("error.ejs", { message: err.message });
  }
};

const createCar = async (req, res) => {
  try {
    const image = req.file.path;

    const carData = {
      id: generateRandomId(),
      ...req.body,
      photo: image,
    };

    await Car.create(carData);
    req.flash("message", "Ditambah");
    res.redirect("/cars");
  } catch (err) {
    res.render("error.ejs", { message: err.message });
  }
};

const editCarPage = async (req, res) => {
  try {
    const car = await Car.findByPk(req.params.id);
    res.render("cars/edit.ejs", { car });
  } catch (err) {
    res.render("error.ejs", { message: err.message });
  }
};

const editCar = async (req, res) => {
  try {
    await Car.edit(req.body, {
      where: { id: req.params.id },
    });
    req.flash("message", "Diedit");
    res.redirect("/cars");
  } catch (err) {
    res.render("error.ejs", { message: err.message });
  }
};

const deleteCar = async (req, res) => {
  try {
    await Car.destroy({ where: { id: req.params.id } });
    req.flash("message", "Dihapus");
    res.redirect("/cars");
  } catch (err) {
    res.render("error.ejs", { message: err.message });
  }
};

module.exports = {
  carPage,
  createCarPage,
  createCar,
  editCarPage,
  editCar,
  deleteCar,
};
