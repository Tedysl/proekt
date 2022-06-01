"use strict";
exports.__esModule = true;
var express = require("express");
var express_1 = require("express");
var userRouter_1 = require("./routes/userRouter");
var app = express();
app.listen(8080, function () {
    console.log("Connected");
});
app.use((0, express_1.json)());
app.use("/api/", userRouter_1.userRouter);
