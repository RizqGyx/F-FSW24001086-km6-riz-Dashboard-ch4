const router = require("express").Router();
const { carAdminController } = require("../controllers/index");

// Route for the dashboard home
router.get("/", carAdminController.carPage);

// Route for creating a new car data
router.get("/create", carAdminController.createCarPage);
router.post("/create", carAdminController.createCar);

// Route for updating a car data
router.get("/update/:id", carAdminController.updateCarPage);
router.post("/update/:id", carAdminController.updateCar);

// Route for deleting a car data
router.post("/delete/:id", carAdminController.deleteCar);

module.exports = router;
