const express = require("express");
const { Users } = require("../Models/User.model");
const Router = express.Router();
const bcrypt = require("bcryptjs");

Router.post("/signup", async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (user) return res.status(400).send("user with this email already exists");

  try {
    let password = await bcrypt.hash("password", 2);
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

module.exports = Router;
