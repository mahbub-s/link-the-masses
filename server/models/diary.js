const mongoose = require('mongoose');

const getDb = require("../db").getDb;
const COLLECTION = require("../db").DIARY_COLLECTION;

const diarySchema = mongoose.Schema({
  date: { type: Date },
  username: { type: String },
  entry: { type: Number }
});

module.exports = getDb().model('diary', diarySchema, COLLECTION);