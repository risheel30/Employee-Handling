const mongoose = require("mongoose");


const projectschema = new mongoose.Schema(
  {
    name:{
      type:String,
    },
    description:{
      type:String,
    },
    technology:[{
      type:String,
    }],
    assignDeveloper:[{
      developerId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
      },
      is_active: {
        type: Boolean,
        default: true
      },
      assign_date:{
        type: Date,
        default: new Date()
      },
    }],
    startDate:{
        type:Date,
    },
    endDate:{
        type:Date,
    },
    projectLink:[{
        type:String,
    }],
    createdAt:{
      type:Date,
      default:new Date(),
    },
    is_active: {
      type: Boolean,
      default: true
    },
    is_deleted:{
      type:Boolean,
      default:false,
    }

});


const Project = mongoose.model("Project", projectschema);

module.exports = Project;
