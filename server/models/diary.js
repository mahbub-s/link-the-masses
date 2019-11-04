const mongoose = require('mongoose');

const getDb = require("../db").getDb;
const COLLECTION = require("../db").DIARY_COLLECTION;

const diarySchema = mongoose.Schema({
  type: { type: Number },
  creationDate: { type: Date },
  researcher: { type: String },

  title: { type: String },
  status: { type: Number },

  entries: [{
    date: { type: Date },
    entry: { type: String }
  }]
});

module.exports = getDb().model('diary', diarySchema, COLLECTION);