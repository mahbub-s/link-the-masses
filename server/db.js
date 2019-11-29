
const mongoose = require("mongoose");
const config = require('./config/config');

const DB_NAME = 'link-the-masses';

const USERS_COLLECTION = 'users';
const CHAT_COLLECTION = 'chat';
const CODETABLE_COLLECTION = 'codetable';
const DIARY_COLLECTION = 'diary';
const PARTICIPANTS_COLLECTION = 'participants';
const QUESTIONNAIRES_COLLECTION = 'questionnaires';
const RESEARCHERS_COLLECTION = 'researchers';

const url = "mongodb+srv://admin:" + config.MONGO_ATLAS_PW + "@mongo-cluster-i6meo.mongodb.net/link-the-masses";

let _db;

function initDb(callback) {
    mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, connected)
      .then(() => { console.log('Connected to database!'); })
      .catch(() => { console.log('Connection failed'); });

    function connected(err, db) {
        if (err) {
            return callback(err);
        }
        _db = db;
        return callback(null, _db);
    }
}

function getDb() {
    _db = mongoose.connection;
    return _db;
}

module.exports = {
    getDb,
    initDb,
    DB_NAME,
    USERS_COLLECTION,
    CHAT_COLLECTION,
    CODETABLE_COLLECTION,
    DIARY_COLLECTION,
    PARTICIPANTS_COLLECTION,
    QUESTIONNAIRES_COLLECTION,
    RESEARCHERS_COLLECTION
};