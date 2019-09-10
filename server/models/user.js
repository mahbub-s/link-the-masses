const mongoose = require('mongoose');

const getDb = require("../db").getDb;
const COLLECTION = require("../db").USER_COLLECTION;

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  role: { type: Number }
});

module.exports = getDb().model('user', userSchema, COLLECTION);