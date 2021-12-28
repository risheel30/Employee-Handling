const mongoose = require("mongoose");


const userattendanceschema = new mongoose.Schema(
  {
    userID:{
      type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    startDate:{
      type:Date,
      default:new Date()
    },
    endDate:{
      type:Date,
      default:null
    },
    createdAt:{
      type:Date,
      default:new Date(),
    },
    is_deleted:{
      type:Boolean,
      default:false
    }

});


const UserAttendance = mongoose.model("UserAttendance", userattendanceschema);

module.exports = UserAttendance;
