const Car = require("../models/car");
const { generateRandomId } = require("../utils/generateId");

const carPage = async (req, res) => {
  try {
    const cars = await Car.findAll();

    res.render("cars/index.ejs", {
      cars,
      message: req.flash("message", ""),
    });
  } catch (err) {
    res.render("error.ejs", { message: err.message });
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

const updateCarPage = async (req, res) => {
  try {
    const car = await Car.findByPk(req.params.id);
    res.render("cars/update.ejs", { car });
  } catch (err) {
    res.render("error.ejs", { message: err.message });
  }
};

const updateCar = async (req, res) => {
  try {
    await Car.update(req.body, {
      where: { id: req.params.id },
    });
    req.flash("message", "Diupdate");
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
  updateCarPage,
  updateCar,
  deleteCar,
};
