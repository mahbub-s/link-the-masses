const mongoose = require('mongoose');

const getDb = require("../db").getDb;
const COLLECTION = require("../db").CHAT_COLLECTION;

const chatSchema = mongoose.Schema({
  username: { type: String },
  message: { type: String }
});

module.exports = getDb().model('chat', chatSchema, COLLECTION);