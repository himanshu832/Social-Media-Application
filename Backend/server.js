const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./router/userRouter");
const Post = require("./router/postRouter");
const path = require("path");
const Comments = require("./router/commentsRouter");

require("dotenv").config();

app.use(cors());

app.use(bodyParser.json());

//dotEnv.config({path:"./env/.env"});             process.env.MONGO_DB_CLOUD_URL

//const port = process.env.PORT || 5000;
const port = 5000;

const MONGO_URL = process.env.MONGO_URL;

mongoose
  .connect(MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((response) => {
    console.log("Connected to Mongo");
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

// if(process.env.NODE_ENV === "production"){
 
// }

app.use("/api/users", User);
//app.use("/api/profiles",require("./router/profileRouter"));
app.use("/api/posts", Post);
app.use("/api/comments", Comments);

app.listen(port, () => {
  console.log(`Express Server is started at : ${port}`);
});

// const express = require('express')
// const User  = require('./router/userRouter')
// const bodyParser = require('body-parser')
// const cors = require('cors')

// const app = express()
// const port  = 8000
// app.use(cors())
// app.use(bodyParser.json())
// app.use('/api/user',User)

// app.get('/',function(req,res){
//        res.send("Welcome to Express")
// })

// app.listen(port,function(){
//     console.log("Server is Started")
// })
