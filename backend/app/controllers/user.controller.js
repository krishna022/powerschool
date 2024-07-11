const db = require("../models");
const User = db.users;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const config = require("../config/auth.config.js");


// Retrieve all Appointments from the database.
exports.findAll = (req, res) => {
  User.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving appointments."
      });
    });
};


// Create and Save a new User
exports.create = async (req, res) => {
  if (!req.body.name && !req.body.email && !req.body.password) {
    res.status(400).send({ message: "Inputs can't be empty!" });
    return;
  }
 
  const users = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });
 
  users.save(users).then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};


// Login using Email and Password
exports.signin = (req, res) => {
  User.findOne({
    email: req.body.email,
  }).then((user) => { 
     if (!user) {
        return res.status(404).send({ message: "User has not registered." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({ message: "Invalid Password!" });
      }
      const token = jwt.sign({ id: user.id },
                              config.secret,
                              {
                                algorithm: 'HS256',
                                allowInsecureKeySizes: true,
                                expiresIn: 86400, // 24 hours
                              });
      res.status(200).send({
        id: user._id,
        name: user.name,
        email: user.email,
        accessToken: token
      });
    });
};


// Validate Duplicate Email Id
exports.duplicateCheck = (req, res) => {
  User.findOne({
    email: req.body.email,
  }).then((user) => {
    if (!user) {
      return res.status(404).send({ message: "User has not registered." });
    }
    res.status(200).send({
      id: user._id,
    });
  });

};


// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  User.findByIdAndDelete(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      } else {
        res.send({
          message: "User was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
};

