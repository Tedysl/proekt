import express = require("express")
import {Application, json} from "express";
import {userRouter} from "./routes/userRouter";
const app: Application = express()


app.listen(8080, () =>{
    console.log("Connected")
})
app.use(json());

app.use("/api/", userRouter);
