var express =require("express");
var router = express.Router();
var problemService = require("../services/problemService");
var bodyParser = require("body-parser");
var jsonPaser = bodyParser.json();

var node_rest_client = require('node-rest-client').Client;
var rest_client = new node_rest_client();

EXECUTOR_SERVER_URL = 'http://127.0.0.1:5000/build_and_run';

rest_client.registerMethod('build_and_run',EXECUTOR_SERVER_URL, 'POST');

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

router.post("/build_and_run", jsonPaser, function (req, res) {
    const userCode = req.body.user_code;
    const lang = req.body.lang;

    console.log(lang+':'+userCode);
    rest_client.methods.build_and_run(
        {
            data:{code: userCode, lang: lang},
            headers: { "Content-Type": "application/json"}
        }, (data,response) =>{
            console.log("Received response from execution server: " + response);
            const text = `Build output: ${data['build']}
      Execute output: ${data['run']}`;

            data['text'] = text;
            res.json(data);
        }
    )
});

module.exports = router;
