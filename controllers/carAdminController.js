const { Car } = require("../models");
const { Op } = require("sequelize");
const imagekit = require("../libs/imageKit");
const multer = require("multer");
const { generateRandomId } = require("../utils/generateId");

const multerStorage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb("null", "public/img/cars");
  },
  filename: (req, res, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `cars-${req.body.name}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg"
  ) {
    cb(null, true);
  } else {
    return cb(null, false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadProductPhoto = upload.single("photo");

const carPage = async (req, res) => {
  try {
    let whereCondition = {};

    if (req.query.size) {
      whereCondition.size = req.query.size;
    }

    const size_value = req.query.size || "";
    const searchTerm = req.query.search || "";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const offset = (page - 1) * limit;

    const { count, rows: cars } = await Car.findAndCountAll({
      where: {
        ...whereCondition,
        name: { [Op.iLike]: `%${searchTerm}%` },
      },
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
    const image = req.files.path;

    const carData = {
      id: generateRandomId(),
      ...req.body,
      photo: image,
    };

    await Car.create(carData);
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
    await Car.update(req.body, {
      where: { id: req.params.id },
    });
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
