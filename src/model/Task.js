const mongoose = require("mongoose");


const userTaskschema = new mongoose.Schema(
  {
    userID:{
      type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    startDate:{
      type:Date,
      default: new Date()
    },
    project:[{
        projectID:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Project'
        },
        description:{
            type:String,
        }

    }]

   

});

const UserTask = mongoose.model("UserTask", userTaskschema);

module.exports = UserTask;
