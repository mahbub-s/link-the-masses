const mongoose = require('mongoose');

const getDb = require("../db").getDb;
const COLLECTION = require("../db").USER_COLLECTION;

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  role: { type: Number },

  firstName: { type: String },
  lastName: { type: String },
  age: { type: Number },
  sex: { type: Number },
  address: { type: String },

  studies: [{}]
});

module.exports = getDb().model('user', userSchema, COLLECTION);