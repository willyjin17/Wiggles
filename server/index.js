const express=require("express");
const cors=require("cors");
const cookieParser = require("cookie-parser");
const mongoose=require("mongoose");
const authRoute = require("./Routes/Route");

require("dotenv").config();

const app=express();
app.use(cookieParser());

app.use(express.json());
app.use(cors({
    origin:true,
    credentials:true,
}));

mongoose.connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.zp5s7d6.mongodb.net/wiggles`
);

app.use("/", authRoute); 


app.listen(3001,()=>{
    console.log("Server started on PORT 3001");
}) 
 