const { Car } = require("../models");
const { Op } = require("sequelize");
const { generateRandomId } = require("../utils/generateId");

// const carPage = async (req, res) => {
//   try {
//     const size_value = req.query.size || "";
//     const searchTerm = req.query.search || "";
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;

//     const offset = (page - 1) * limit;

//     const { count, rows: cars } = await Car.findAndCountAll({
//       where: {
//         size: size_value,
//         name: { [Op.iLike]: `%${searchTerm}%` },
//       },
//       offset,
//       limit,
//     });

//     const totalPages = Math.ceil(count / limit);
//     console.log(cars);

//     res.render("cars/index.ejs", {
//       cars: cars || [],
//       size: size_value,
//       searchTerm,
//       currentPage: page,
//       totalPages,
//       limit,
//       message: req.flash("message", ""),
//     });
//   } catch (err) {
//     res.render("error.ejs", { message: err.message, statusCode: 400 });
//   }
// };

const carPage = async (req, res) => {
  try {
    const size_value = req.query.size || "";
    const searchTerm = req.query.search || "";
    const page = parseInt(req.query.page) || 1; // Nomor halaman, default 1
    const limit = parseInt(req.query.limit) || 10; // Batasan jumlah data yang diambil, default 10

    // Menghitung offset berdasarkan nomor halaman dan batasan jumlah data
    const offset = (page - 1) * limit;

    // Melakukan pencarian data mobil dari tabel Car dengan pagination
    const { count, rows: cars } = await Car.findAndCountAll({
      where: {
        size: size_value,
        name: { [Op.iLike]: `%${searchTerm}%` },
      },
      offset,
      limit,
    });

    // Menghitung total halaman berdasarkan jumlah data dan batasan jumlah data per halaman
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
