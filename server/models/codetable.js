const mongoose = require('mongoose');

const getDb = require("../db").getDb;
const COLLECTION = require("../db").CODETABLE_COLLECTION;

const codetableSchema = mongoose.Schema({});

module.exports = getDb().model('codetable', codetableSchema, COLLECTION);