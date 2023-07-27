const express=require("express");
const cors=require("cors");
const jwt = require('jsonwebtoken');
const bcrypt=require("bcrypt");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");

const app=express();
app.use(cookieParser());

app.use(express.json());
app.use(cors({
    origin:true,
    credentials:true,
}));

    

app.listen(4000, ()=>{
    console.log("Server started");
})
app.use("/", authRoute);