const mongoose = require("mongoose");

const task = new mongoose.Schema({
  user_id: { type: String ,required:true},
  taskList: [
    {
      taskid: {
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId,
      },
      task: { type: String },
    },
  ],
});
const Task = mongoose.model("Task", task);
module.exports.Task = Task;
