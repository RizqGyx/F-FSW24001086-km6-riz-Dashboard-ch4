const { Car } = require("../models");
const { Op } = require("sequelize");
const { generateRandomId } = require("../utils/generateId");

const carPage = async (req, res) => {
  try {
    let whereCondition = {};

    if (req.query.size) {
      whereCondition.size = req.query.size;
    }

    let searchTerm = "";
    if (req.query.search) {
      searchTerm = req.query.search.trim();
      whereCondition.name = { [Op.iLike]: `%${searchTerm}%` };
    }

    const size_value = req.query.size || "";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const offset = (page - 1) * limit;

    const { count, rows: cars } = await Car.findAndCountAll({
      where: whereCondition,
      offset,
      limit,
    });

    const totalPages = Math.ceil(count / limit);

    res.render("cars/index.ejs", {
      cars: cars || [],
      size: size_value,
      searchTerm,
      currentPage: page,
      totalPages,
      limit,
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
    res.render("error.ejs", { message: err.message, statusCode: 400 });
  }
};

const createCar = async (req, res) => {
  try {
    let image = null;
    if (req.file) {
      image = req.file.filename;
    }

    const carData = {
      id: generateRandomId(),
      ...req.body,
      photo: image,
    };

    await Car.create(carData);
    console.log(image);
    console.log(req.body);
    req.flash("message", "Ditambah");
    res.redirect("/cars");
  } catch (err) {
    res.render("error.ejs", { message: err.message, statusCode: 400 });
  }
};

const editCarPage = async (req, res) => {
  try {
    const car = await Car.findByPk(req.params.id);
    res.render("cars/edit.ejs", { car });
  } catch (err) {
    res.render("error.ejs", { message: err.message, statusCode: 400 });
  }
};

const editCar = async (req, res) => {
  try {
    const car = await Car.findByPk(req.params.id);

    let updatedCarData = { ...req.body };

    if (req.file) {
      updatedCarData.photo = req.file.filename;
    }

    await car.update(updatedCarData);

    req.flash("message", "Diedit");
    res.redirect("/cars");
  } catch (err) {
    res.render("error.ejs", { message: err.message, statusCode: 400 });
  }
};

const deleteCar = async (req, res) => {
  try {
    await Car.destroy({ where: { id: req.params.id } });
    req.flash("message", "Dihapus");
    res.redirect("/cars");
  } catch (err) {
    res.render("error.ejs", { message: err.message, statusCode: 400 });
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
