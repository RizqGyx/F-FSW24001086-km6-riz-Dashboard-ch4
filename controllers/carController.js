const { response } = require("../utils/response");
const Cars = require("../models/carModels");

const getCars = async (req, res) => {
  try {
    const cars = await Cars.findAll();
    response(200, cars, "Success", "Fetched all cars", req, res, true);
  } catch (err) {
    response(400, null, "Failed", err.message, req, res);
  }
};

const getCarById = async (req, res) => {
  try {
    const id = req.params.id;
    const cars = await Cars.findOne(id);

    if (!cars)
      return response(
        404,
        null,
        "Failed",
        `Car with ID : ${id} not found`,
        req,
        res
      );

    response(
      200,
      cars,
      "Success",
      `Fetched car with ID : ${id}`,
      req,
      res,
      false
    );
  } catch (err) {
    response(400, null, "Failed", err.message, req, res);
  }
};

const createCar = async (req, res) => {
  try {
    const cars = await Cars.create(req.body);

    response(201, cars, "Success", "Create New Car Data", req, res, false);
  } catch (err) {
    response(400, null, "Failed", err.message, req, res);
  }
};

const updateCarById = async (req, res) => {
  try {
    const id = req.params.id;
    const cars = await Cars.update(id);

    if (!cars)
      return response(
        404,
        null,
        "Failed",
        `Car with ID : ${id} not found`,
        req,
        res
      );

    response(201, cars, "Success", "Create New Car Data", req, res, false);
  } catch (err) {
    response(400, null, "Failed", err.message, req, res);
  }
};

const deleteCarById = async (req, res) => {
  try {
    const id = req.params.id;
    const cars = await Cars.destroy(id);

    if (!cars)
      return response(
        404,
        null,
        "Failed",
        `Car with ID : ${id} not found`,
        req,
        res
      );

    response(
      200,
      cars,
      "Success",
      `Deleted car with ID : ${id}`,
      req,
      res,
      false
    );
  } catch (err) {
    response(400, null, "Failed", err.message, req, res);
  }
};

module.exports = {
  getCars,
  getCarById,
  createCar,
  updateCarById,
  deleteCarById,
};
