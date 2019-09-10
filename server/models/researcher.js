const mongoose = require('mongoose');

const getDb = require("../db").getDb;
const COLLECTION = require("../db").RESEARCHERS_COLLECTION;

const researcherSchema = mongoose.Schema({
  username: { type: String }
});

module.exports = getDb().model('researcher', researcherSchema, COLLECTION);