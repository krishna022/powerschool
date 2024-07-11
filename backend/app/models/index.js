const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.appointments = require("./appointment.model");
db.users = require("./user.model");

module.exports = db;



// const mongoose = require('mongoose');
// mongoose.Promise = global.Promise;

// const db = {};

// db.mongoose = mongoose;

// db.user = require("./user.model");
// db.role = require("./role.model");

// db.ROLES = ["user", "admin", "moderator"];

// module.exports = db;
