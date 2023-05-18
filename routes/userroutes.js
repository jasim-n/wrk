const express = require("express");
const { Users } = require("../Models/User.model");
const Router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

Router.post("/signup", async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (user) return res.status(400).send("user with this email already exists");

  try {
    let password = await bcrypt.hash(req.body.password, 2);
    let result = await Users.create({
      fullName: req.body.fullName,
      email: req.body.email,
      password: password,
    });
    res.status(200).send({ result });
  } catch (error) {
    console.log(error);
  }
});

Router.post("/signin", async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  console.log(req.body);
  if (!user) return res.status(400).send({ msg: "No such User found", user });
  let isValid = await bcrypt.compare(req.body.password, user.password);
  console.log(user.password, req.body.password, isValid);
  if (!isValid) return res.status(401).send({ message: "Invalid Password" });
  let token = jwt.sign(
    { _id: user._id, name: user.name, password:user.password },
     'key' );
  res.status(200).send({ message: "good to go" ,token:token});
});

module.exports = Router;
