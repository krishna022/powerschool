module.exports = app => {
  const appointments = require("../controllers/appointment.controller.js");
  const { authJwt } = require("../middlewares");

  var router = require("express").Router();

  // Create a new Appointment
  router.post("/create", [authJwt.verifyToken], appointments.create);

  // Retrieve all appointments
  router.get("/", [authJwt.verifyToken], appointments.findAll);

    // Create a new Appointment
  router.post("/getByUserAndDate", [authJwt.verifyToken], appointments.getByUserAndDate);

  // Update a Appointment with id
  router.put("/:id", [authJwt.verifyToken], appointments.update);

  // Delete a Appointment with id
  router.delete("/:id", [authJwt.verifyToken], appointments.delete);

  app.use("/api/appointments", router);
};
