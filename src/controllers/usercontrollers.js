const User=require("../model/User");
const Project=require("../model/Project");
const Task=require("../model/Task")

const profile = function (req, res) {
  User.findById(req.user._id,function(err,user){
    if(err)
    {
      res.send(err);
      
    }
    else
    {
      if(user.role==='Employee')
      {
        res.send(user);
      }
      else
      {
        User.find({role:"Employee"},function(err,users){
            if(err)
            {
              res.send(err);
            }
            else
            {
              res.send(users);
            }
        })
      }
    }
  })
    //res.json({massage:"profile"});
  };
const create = function (req, res) {
    console.log(req.body);
    //res.json({massage:"ok"});
    if (req.body.password != req.body.confirm_password) {
      //console.log("hmm");
      return res.redirect("back");
    }
    User.findOne({ company_emailID: req.body.company_emailID }, function (err, user) {
      console.log("finding");
      if (err) {
        console.error(err);
        return;
      }
      //console.log(user);
      if (!user) {
        User.create(req.body, function (err, user) {
            console.log("creating");
          if (err) {
            console.error(err);
            return;
          }
          return res.redirect("/users/profile");
        });
      } else {
        return res.redirect("/users/profile");
      }
    });
  };
  const signIn = function (req, res) {
    //console.log("signin");
    if (req.isAuthenticated()) {
      return res.json({massage:"login successfully",role:req.user.role,status:"200"});
    }
    return res.json({massage:"user not authenticated",status:"201"});
  };
  const destroySession = function (req, res) {
    //console.log("ok");
    req.logout();
    res.json({massage:"logout sucessfully"})
    //return res.redirect("users/signin");
  };

  const signUp = function (req, res) {
      res.json({massage:"signUp"});
    // if (req.isAuthenticated()) {
    //   return res.redirect("/users/profile");
    // }
    // return res.render("users/user_sign_up", {
    //   title: "Twitter | Sign In",
    //   //layout: __dirname + "/../../src/views/layouts/user_layout"
    // });
  };
  const fail=function(req,res)
  {
    return res.json({massage:"invalid password or user",status:"401"})
  }
const update=function(req,res){
 // console.log(req.body);
  if(req.body.company_emailID || req.body.password)
  {
    console.log("can't be change");
    return res.redirect("/users/profile");
  }
  if(req.body.mobileNumber){
    let pass=Number(req.body.mobileNumber);
    if(!pass || (req.body.mobileNumber).length!=10 )
    {
      console.log("enter valid mobile Number");
      return res.redirect("/users/profile");
    }
  }
  //console.log(req.files);
   if(req.files['candidatePhoto'] || req.files['proof'] || req.files['letter'] )
   {
    let wh = {}
    if(req.files['letter'].length){
      let letterarr=[];
      req.files['letter'].forEach(function(obj){
        letterarr.push({letterImage:obj.filename})
      })
      wh.letter=letterarr
    }
    if(req.files['proof'].length){
      let proofarr=[];
      req.files['proof'].forEach(function(obj){
        proofarr.push({proofImage:obj.filename})
      })
      wh.proof=proofarr
    }
   let values = {
      $push: wh
    }
    //console.log(values);
    User.updateOne({_id: req.user._id}, values,function (err, user) {
      if (err){
          console.log(err)
      }
      else{
          console.log("Updated");
      }
    })
  
  
  User.findByIdAndUpdate(req.user._id, req.body,
                            function (err, user) {
    if (err){
        console.log(err)
    }
    else{
        console.log("Updated");
    }
  });
  res.redirect("/users/profile");
  }
}

const getProject=function(req,res){
  Project.aggregate([{
    "$match":{assignDeveloper:{"$elemMatch":{developerId:req.user._id,is_active:true}}}
  }],function(err,data){
    if(err)
    {
      console.log(err);
      return;
    }
    else
    {
      res.json(data);
    }
  })
}

const addTask=function(req,res){
  let projects=req.body.project;
  delete req.body.project;
  req.body.userID=req.user._id;
  Task.create(req.body,function(err,task){
    if(err)
    {
      console.log(err);
      return res.json({massage:"error occur"});
    }
    else
    {
      let wh={};
      wh.project=projects;
      let values={
        $push:wh
      }
      Task.updateOne({_id:task._id},values,function(err,task){
        if(err)
        {
          console.log(err);
          return res.json({massage:"error occur"});
        }
        else
        {
          console.log("Task created");
          return res.json({massage:"inserted successfully"})
        }
      })
    }
  })
}

const getTask=function(req,res){
  Task.find({userID:req.user._id}, function(err,data){
    if(err)
    {
      console.log("error finding task");
      return res.json({massage:"error finding task"});
    }
    else
    {
      console.log(data);
      return res.json(data);
    }
  }).populate('project.projectID');
}
module.exports={create,
  signIn,
  signUp,
  profile,
  destroySession,
  update,
  getProject,
  addTask,
  getTask,
  fail,
};