const mongoose = require('mongoose');

const getDb = require("../db").getDb;
const COLLECTION = require("../db").CHAT_COLLECTION;

const chatSchema = mongoose.Schema({
  type: { type: Number },
  creationDate: { type: Date },
  researcher: { type: String },

  title: { type: String },
  status: { type: Number },
  description: { type: String },

  upperAgeRange: { type: Number },
  lowerAgeRange: { type: Number },
  sex: { type: Number },

  responses: [{
    username: { type: String },
    message: { type: String }
  }]
});

module.exports = getDb().model('chat', chatSchema, COLLECTION);