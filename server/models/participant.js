const mongoose = require('mongoose');

const getDb = require("../db").getDb;
const COLLECTION = require("../db").PARTICIPANTS_COLLECTION;

const participantSchema = mongoose.Schema({
  username: { type: String },
  age: { type: Number },
  sex: { type: String }
});

module.exports = getDb().model('participant', participantSchema, COLLECTION);