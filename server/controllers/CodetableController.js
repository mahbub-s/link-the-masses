
var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");

const Codetable = require("../models/codetable");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Read a document
router.get("/", (req, res) => {
  Codetable.find({}, null, (err, results) => {
    if (err) throw err;
    if (results.length == 0) {
      res.status(200).json([]);
    } else {
      res.status(200).json(results);
    }
  });
});

module.exports = router;