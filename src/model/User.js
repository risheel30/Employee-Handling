const mongoose = require("mongoose");


const userschema = new mongoose.Schema(
  {
    role:{
        type:String,
        enum:['Admin','Employee'],
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    password:{
        type:String,
        required:true,
    },
    mobileNumber: {
      type: Number,
      //unique:true,
      maxlength:12,
      minlength:5,

    },
    refMobile:{
        type: Number,
      //unique:true,
      maxlength:12,
      minlength:5,      
    },
    personel_emialID:{
        type:String,
        unique:String

    },
    company_emailID:{
        type:String,
        unique:true,
        required:true
    },
    age:{
        type:Number,
        maxlength:3,  
    },
    gender:{
        type:String,
        enum : ['Male','Female','Other'],
    },
    DOB:{
        type:Date,
    },
    permanent_Address:{
        type:String,
        minlength:5,
    },
    current_Address:{
        type:String,
        minlength:5,
    },
    designation:{
        type:String,
    },
    technology:{
        type:String,
    },
    joinDate:{
        type:Date,
    },
    LeaveDate:{
        type:Date,
    },
    Degree:{
        type:String,
    },
    linkedinURL:{
        type:String,
    },
    salary:{
        type:Number,
    },
    is_Active:{
        type:Boolean,
        default:false,
    },
    candidatePhoto:{
        type:String
    },
    proof: [
        {
            // proofName:{
            //     type:String,
            // },
            proofImage:{
                type:String,
            }            
        }
    ],
    letter:[
        {
            // letterName:{
            //     type:String,
            // },
            letterImage:{
                type:String,
            }            
        }
    ]



  },
  { timestamps: true }
);
const User = mongoose.model("User", userschema);

module.exports = User;
