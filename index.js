// require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
const userRoute = require("./routes/userroutes");
app.use(cors());
app.use(express.json());
const mongoose = require("mongoose");



app.post("/api/message",async (req, res) => { console.log('red'); res.send(200)})
app.use("/api/users", userRoute);
app.listen(8080, () => {
  console.log("seervers connected");
});

app.get("/hello", (req, res) => {
    res.send("hello world");
      
  });


const uri =
  "mongodb+srv://shahbaz:jasim123@cluster0.c1ikhi4.mongodb.net/tst?retryWrites=true&w=majority";
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to Mongo...."))
  .catch((error) => console.log(error.message));
