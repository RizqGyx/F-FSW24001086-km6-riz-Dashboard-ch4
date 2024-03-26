const express = require("express");

const {
  getCars,
  getCarById,
  createCar,
  updateCarById,
  deleteCarById,
} = require("../controllers/carController");

const router = express.Router();

router.route("/").get(getCars).post(createCar);
router.route("/:id").get(getCarById).patch(updateCarById).delete(deleteCarById);

module.exports = router;
