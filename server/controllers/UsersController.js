
var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");

const ObjectId = require("mongodb").ObjectID;

const User = require("../models/user");

var app = express();
var server = app.listen(3001);
var io = require('socket.io').listen(server);

//let middleware = require('../services/middleware')
var passwordServices = require('../services/passwordServices')
let jwt = require('jsonwebtoken');
let config = require('../config/config')

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Create a document
router.post("/", (req, res) => {
  passwordServices.setPassword(req.body);
  User.create(req.body, (err, result) => {
    if (err) throw err;
    res.status(201);
    res.send({ message: "success" });
  });
});

// Read a document
router.get("/", (req, res) => {
  User.find({}, null, (err, results) => {
    if (err) throw err; 
    if (results.length == 0) {
      res.status(200).json([]);
    } else {
      res.status(200).json(results);
    }
  });
});

// Read participant
router.get("/:id", (req, res) => {
  User.aggregate([
    {
      '$unwind': {
        'path': '$studies'
      }
    }, {
      '$match': {
        '_id': ObjectId(req.params.id),
        'studies.status': 0
      }
    }
  ], (err, results) => {
    if (err) throw err; 
    if (results.length == 0) {
      res.status(200).json([]);
    } else {
      res.status(200).json(results);
    }
  });
});

// Get partcipants chats
router.get("/researcher/:username", (req, res) => {
  User.aggregate([
    {
      '$unwind': {
        'path': '$studies'
      }
    }, {
      '$match': {
        'studies.researcher': req.params.username,
        'studies.status': 0, 
        'studies.type': 1
      }
    },
    {
      '$addFields': {
        'studies.participant': '$username'
      }
    }
  ], (err, results) => {
    if (err) throw err; 
    if (results.length == 0) {
      res.status(200).json([]);
    } else {
      res.status(200).json(results);
    }
  });
});

// Get completed partcipant studies based on researcher
router.get("/researcher/completed/:username", (req, res) => {
  User.aggregate([
    {
      '$unwind': {
        'path': '$studies'
      }
    }, {
      '$match': {
        'studies.researcher': req.params.username,
        'studies.status': 1
      }
    },
    {
      '$addFields': {
        'studies.participant': '$username'
      }
    }
  ], (err, results) => {
    if (err) throw err; 
    if (results.length == 0) {
      res.status(200).json([]);
    } else {
      res.status(200).json(results);
    }
  });
});

router.get("/updateToken/:id", (req, res) => {
  User.find({ _id: ObjectId(req.params.id) }, null, (err, results) => {
    if (err) throw err;
    if (results.length == 0) {
      res.status(404).json([]);
    } else {
        let token = jwt.sign({username: results.username, role: results.role},
          config.secret,
          { 
            expiresIn: '24h' // expires in 24 hours
          }
        );
        let result = {
          _id: results[0]['_id'],
          studies: results[0]['studies'],
          username: results[0]['username'],
          role: results[0]['role'],
          firstName: results[0]['firstName'],
          lastName: results[0]['lastName'],
          age: results[0]['age'],
          sex: results[0]['sex'],
          address: results[0]['address'],
          isAuthenticated: isAuthenticated = true, 
          token: token
        }
        res.status(200).json(result);
    }
  });
});

// login
router.post("/login", (req, res, next) => {
  User.find({'username': req.body.username}, null, (err, results) => {   
    if (err) throw err;
    if (results.length == 0) {
      console.log("404 in login")
      res.status(404).json([]);
    } else {
      if(passwordServices.verifyPassword(results[0], req.body.password)){
        let token = jwt.sign({username: req.body.username, role: results.role},
          config.secret,
          { 
            expiresIn: '24h' // expires in 24 hours
          }
        );
        console.log(token);
        let result = {
          _id: results[0]['_id'],
          studies: results[0]['studies'],
          username: results[0]['username'],
          role: results[0]['role'],
          firstName: results[0]['firstName'],
          lastName: results[0]['lastName'],
          age: results[0]['age'],
          sex: results[0]['sex'],
          address: results[0]['address'],
          isAuthenticated: isAuthenticated = true, 
          token: token
        }// authenticate???
        res.status(200).json(result);
      } else {
        return res.status(404).json([]);  
      }
    }
  });
}); 

// Update a document
router.put("/:id", (req, res) => {
  User.updateOne(
    { _id: ObjectId(req.params.id) },
    { $set: req.body },
    (err, results) => {
      if (err) throw err;
      if (results.n == 0) {
        res.status(404);
        res.send({ message: "failed" });
      } else {
        res.status(200);
        res.send({ message: "success" });
      }
    }
  );
});

// Update participant chat log
router.put("/study/:participant", (req, res) => {
  User.updateOne(
    { username: req.params.participant, 'studies._id': req.body._id },
    { $set: {'studies.$': req.body} },
    (err, results) => {
      if (err) throw err;
      if (results.n == 0) {
        res.status(404);
        res.send({ message: "failed" });
      } else {
        io.emit('Chat updated');
        res.status(200);
        res.send({ message: "success" });
      }
    }
  );
});

// Delete a document
router.delete("/:id", (req, res) => {
  User.deleteOne({ _id: ObjectId(req.params.id) }, (err, obj) => {
    if (err) throw err;
    if (obj.n == 0) {
      res.status(404);
      res.send({ message: "failed" });
    } else {
      res.send({ message: "success" });
    }
  });
});


// Login
router.post("/login2", (req, res) => {
  User.findOne({'username': req.body.username}, null, (err, result) => {
    if (err) throw err;
    if (result.length == 0) {
      res.status(404).json([]);
    } else {
      console.log(result);
      res.status(200).json(result);
    }
  });
});

module.exports = router;