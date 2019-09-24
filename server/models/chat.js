const mongoose = require('mongoose');

const getDb = require("../db").getDb;
const COLLECTION = require("../db").CHAT_COLLECTION;

const chatSchema = mongoose.Schema({
  title: { type: String },
  type: { type: Number },
  status: { type: Number },
  username: { type: String },
  message: { type: String }
});

module.exports = getDb().model('chat', chatSchema, COLLECTION);