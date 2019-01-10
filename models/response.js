const mongoose = require("mongoose");
const validator = require("validator");

const ResponseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    validate: {
      validator: validator.isEmail,
      message: "{VALUE} is not a valid email"
    }
  },
  attending: {
    type: Boolean,
    required: true
  },
  questCount: {
    type: Number,
    required: true,
    min: 1,
    max: 8
  }
});
const EventResponse = mongoose.model('Response', ResponseSchema);

module.exports = { EventResponse };
