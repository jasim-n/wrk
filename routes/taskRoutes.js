const express = require("express");
const { Task } = require("../Models/Todo");
const { Users } = require("../Models/User.model");
const mongoose = require("mongoose");

const Router = express.Router();

Router.post("/add", async (req, res) => {
  try {
    if (req.body.userid.length != 24)
      return res.status(400).send({ message: "Invalid id" });
    let user = await Users.findOne({ _id: req.body.userid });
    if (user) {
      const taskcheck = await Task.findOne({ user_id: req.body.userid });
      if (taskcheck) {
        let up = await Task.updateOne(
          { _id: taskcheck._id },
          {
            $push: {
              taskList: [
                {
                  taskid: new mongoose.Types.ObjectId(),
                  task: req.body.task,
                },
              ],
            },
          }
        );
      } else {
        let task = await Task.create({
          user_id: req.body.userid,
          taskList: [
            {
              taskid: new mongoose.Types.ObjectId(),
              task: req.body.task,
            },
          ],
        });
      }

      return res.send({ mesg: "found" });
    } else return res.send({ msg: "nope" });
  } catch (error) {
    console.log(error);
  }
});

Router.delete("/del", async (req, res) => {
  try {
    let user = await Users.findOne({ _id: req.body.userid });
    if (!user) return res.status(400).send({ msg: "thier are no tasks" });
    const taskcheck = await Task.findOne({ user_id: req.body.userid });
    if (!taskcheck) return res.status(400).send({ msg: "thier are no tasks" });

    let up = await Task.updateOne(
      { _id: taskcheck._id },
      {
        $pull: {
          taskList: { task: req.body.task },
        },
      }
    );
    return up.modifiedCount > 0
      ? res.status(200).send({ msg: "done" })
      : res.status(200).send({ msg: "no such data" });
  } catch (error) {
    console.log(error);
  }
});

Router.get("/show", async (req, res) => {
  let user = await Users.findOne({ _id: req.body.userid });
  if (!user) return res.status(400).send({ msg: "thier are no tasks" });
  const taskcheck = await Task.findOne({ user_id: req.body.userid });
  if (!taskcheck) return res.status(400).send({ msg: "thier are no tasks" });
  return res.status(200).send({ data: taskcheck.taskList });
});
Router.put("/up", async (req, res) => {
  let user = await Users.findOne({ _id: req.body.userid });
  if (!user) return res.status(400).send({ msg: "thier are no tasks" });
  const taskcheck = await Task.findOne({ user_id: req.body.userid });
  if (!taskcheck) return res.status(400).send({ msg: "thier are no tasks" });
  let up = await Task.updateOne(
    { _id: taskcheck._id, "taskList.taskid": req.body.taskid },
    { $set: { "taskList.$.task": req.body.task } }
  );
  console.log(up);
  return res.send({ msg: "done" });
});
module.exports = Router;
