var express = require('express');
var app = express();
const bodyParser= require('body-parser');
const cors = require('cors')

const publicweb = process.env.PUBLICWEB || './dist';

app.use(cors());
app.use(express.static(publicweb));

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

var UsersController = require('./controllers/UsersController');
app.use('/api/users', UsersController);

var ChatController = require('./controllers/ChatController');
app.use('/api/chat', ChatController);

var CodetableController = require('./controllers/CodetableController');
app.use('/api/codetable', CodetableController);

var DiaryController = require('./controllers/DiaryController');
app.use('/api/diary', DiaryController);

var QuestionnairesController = require('./controllers/QuestionnairesController');
app.use('/api/questionnaires', QuestionnairesController);

module.exports = app;
