const router = require("express").Router();

const { carAdminController } = require("../controllers/index");

router.route("/").get(carAdminController.carPage);
router.route("/create").get(carAdminController.createCarPage);
router.route("/admin/create").post(carAdminController.createCar);
router.route("/update/:id").get(carAdminController.updateCarPage);
router.route("/admin/update/:id").post(carAdminController.updateCar);
router.route("/admin/delete/:id").post(carAdminController.deleteCar);

module.exports = router;
