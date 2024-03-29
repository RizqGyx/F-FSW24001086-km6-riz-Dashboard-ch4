const express = require("express");

const { carController } = require("../controllers/index");

const router = express.Router();

router.route("/").get(carController.getCars).post(carController.createCar);
router
  .route("/:id")
  .get(carController.getCarById)
  .patch(carController.updateCarById)
  .delete(carController.deleteCarById);

module.exports = router;
