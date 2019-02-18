var express = require("express");
var mongoose = require("mongoose");
var app = express();
var indexRouter = require("./routes/index");
var restRouter = require("./routes/rest");
var path = require("path");

mongoose.connect("mongodb://user:1password@ds127781.mlab.com:27781/coj");
app.use(express.static(path.join(__dirname, '../public')));
app.use("/", indexRouter);
app.use("/problems", indexRouter);
app.use("/api/v1", restRouter);

app.listen(3000, function () {
    console.log("App listening port 3000");
})
