const express= require("express");
const morgan= require("morgan");
const bodyParser= require("body-parser");
const cabpoolRouter= require("./api/routes/cabpoolRoute");

const app= express();
app.use(morgan("dev"));

app.use(bodyParser.json());

app.use("/cabpools",cabpoolRouter);
module.exports= app;
