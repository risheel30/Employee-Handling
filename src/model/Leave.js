const mongoose = require("mongoose");


const leave = new mongoose.Schema(
  {
    userID:{
      type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    reason:{
        type:String,
    },
    startDate:{
      type:Date,
    },
    endDate:{
      type:Date,
    },
    status:{
        type:String,
        enum:["panding","approved","rejected"],
        default:"panding",
    },
    is_Deleted:{
      type:Boolean,
      default:false,
    }

});


const Leave = mongoose.model("Leave", leave);

module.exports = Leave;
