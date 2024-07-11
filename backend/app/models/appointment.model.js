const mongoose = require("mongoose");

const Appointment = mongoose.model(
  "Appointment",
  new mongoose.Schema(
    {
      title: String,
      date: Date,
      start_time: Date,
      end_time: Date,
      status: String, // ('Scheduled', 'Completed', 'Cancelled')
      userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
    { timestamps: true }
)
);

module.exports = Appointment;

