const dotenv = require("dotenv").config();
const express = require("express")
const cors = require("cors");
const  mongoose  = require("mongoose");
const userRouter = require("./routes/users");

const app = express();

app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

mongoose.connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.lunza1v.mongodb.net/wiggles`
  );
   
app.use("/auth",userRouter);



app.listen(3001,()=>{
    console.log("Server started on PORT 3001");
}) 