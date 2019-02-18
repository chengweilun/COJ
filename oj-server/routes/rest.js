var express =require("express");
var router = express.Router();
var problemService = require("../services/problemService");
var bodyParser = require("body-parser");
var jsonPaser = bodyParser.json();

router.get("/problems", function (req,res) {
    console.log("get problems");
    problemService.getProblems()
        .then(problems => res.json(problems));
});

router.get("/problems/:id", function (req,res) {
    var id = req.params.id;
    console.log("get problem "+ id);
    problemService.getProblem(+id)
        .then(problem => res.json(problem));
});

router.post("/problems", jsonPaser, function (req,res) {
    console.log("post problem");
    problemService.addProblem(req.body)
        .then(function (problem) {
            res.json(problem);
            }, function (error) {
            res.status(400).send("Problem name already exists!");
        });
});

module.exports = router;
