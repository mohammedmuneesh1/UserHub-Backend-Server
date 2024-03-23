const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cors = require("cors")
const rateLimit = require("express-rate-limit");
const mongoose = require("mongoose");
dotenv.config()
const app = express();
const Port = process.env.PORT;
const dbUrl=process.env.DB_URL;
const userRouter= require("./router/userRoutes");

//----------------------------------MONGO DB CONNECTION------------------------------------------------
mongoose.connect(dbUrl).then((res)=>{
    console.log("database connected successfully");
}).catch((err)=>{
    console.log('error occured while connecting database',err);
})
mongoose.connection.on("error",(err)=>{
    console.error("Error connecting to mongo db ",err);
})
mongoose.connection.on("disconnected",()=>{
    console.log("Disconnected from mongo db");
})
//----------------------------------MONGO DB CONNECTION END------------------------------------------------

const limiter = rateLimit({
    max:10,
    windowMs:60*1000
})

app.use(cors());
app.use(helmet());
app.use(express.json({limit:"10mb"}));
app.use(limiter);
app.use("/user",userRouter)


app.listen(Port,()=>{
  console.log("running successfully",Port);
})






