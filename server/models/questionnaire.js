const mongoose = require('mongoose');

const getDb = require("../db").getDb;
const COLLECTION = require("../db").QUESTIONNAIRE_COLLECTION;

const questionnaireSchema = mongoose.Schema({
  title: { type: String }
});

module.exports = getDb().model('questionnaire', questionnaireSchema, COLLECTION);