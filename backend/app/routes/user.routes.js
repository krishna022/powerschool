module.exports = app => {
    const users = require("../controllers/user.controller.js");
    const { authJwt } = require("../middlewares");
  
    var router = require("express").Router();
  
    // Create a new User
    router.get("/",[authJwt.verifyToken], users.findAll);

    // Create a new User
    router.post("/signup", users.create);

    // Login User
    router.post("/login", users.signin);
  
    // Check Duplicate Email-ID
    router.post("/validate_email", users.duplicateCheck);
  
    // Delete a User with id
    router.delete("/:id",[authJwt.verifyToken], users.delete);
  
    app.use("/api/users", router);
  };
  