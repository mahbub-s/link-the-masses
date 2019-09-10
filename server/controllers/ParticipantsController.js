
var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");

const ObjectId = require("mongodb").ObjectID;

const Participant = require("../models/participant");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Create a document
router.post("/", (req, res) => {
  Participant.create(req.body, (err, result) => {
    if (err) throw err;
    res.status(201);
    res.send({ message: "success" });
  });
});

// Read a document
router.get("/", (req, res) => {
  Participant.find({}, null, (err, results) => {
    if (err) throw err;
    if (results.length == 0) {
      res.status(200).json([]);
    } else {
      res.status(200).json(results);
    }
  });
});

// Update a document
router.put("/:id", (req, res) => {
  Participant.updateOne(
    { _id: ObjectId(req.params.id) },
    { $set: req.body },
    (err, results) => {
      if (err) throw err;
      if (results.n == 0) {
        res.status(404);
        res.send({ message: "failed" });
      } else {
        res.send({ message: "success" });
      }
    }
  );
});

// Delete a document
router.delete("/:id", (req, res) => {
  Participant.deleteOne({ _id: ObjectId(req.params.id) }, (err, obj) => {
    if (err) throw err;
    if (obj.n == 0) {
      res.status(404);
      res.send({ message: "failed" });
    } else {
      res.send({ message: "success" });
    }
  });
});

module.exports = router;