const mongoose = require('mongoose');

const getDb = require("../db").getDb;
const COLLECTION = require("../db").QUESTIONNAIRE_COLLECTION;

const questionnaireSchema = mongoose.Schema({
  type: { type: Number },
  creationDate: { type: Date },
  researcher: { type: String },

  title: { type: String },
  status: { type: Number },

  questions: [{
    question: { type: String },
    answer: { type: Number }
  }]
});

module.exports = getDb().model('questionnaire', questionnaireSchema, COLLECTION);