const Project = require("../model/Project");
const User = require("../model/User");
const Task=require("../model/Task");
const UserAttendance=require("../model/UserAttendance");
const Leave=require("../model/Leave");

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
const insert = function (req, res) {
  var users = req.body.assignDeveloper;
  var k = true;

  for (let i = 0; i < users.length; i++) {
    const assignUser = users[i];

    User.findById(assignUser.developerId, function (err, user) {
      if (err) {
        k = false;
        return res.json({ code: 500, data: "", message: "something going wrong" });
      } else {
          if(user){
            if (!user.is_Active) {
                k = false;
                return res.json({ code: 201, data: "", message: user.firstName });
              } else {
                if (users.length == i + 1) {
                    if (k) {
                      saveData();
                    }
                  }
              }
          } else {
            return res.json({ code: 201, data: "", message: "user not found" });
          }
      }
    });
  }

  function saveData() {
    delete req.body.assignDeveloper;
    Project.create(req.body, function (err, project) {
      if (err) {
        console.error(err);
        return;
      } else {
        true;
        let wh = {};
        wh.assignDeveloper = users;
        let values = {
          $push: wh,
        };
        Project.updateOne(
          { _id: project._id },
          values,
          function (err, project) {
            if (err) {
                return res.json({
                    code: 500,
                    data: "",
                    message: "something going wrong.",
                  });
            } else {
                
              return res.json({
                code: 200,
                data: "",
                message: "data instered successfully.",
              });
              
            }
          }
        );
      }
    });
  }
};


const getTask=function(req,res)
{
  Task.find({},function(err,data){
    if(err)
    {
      console.log(err);
      return;
    }
    else
    {
     return res.json(data);
    }
  }).sort({_id: -1})
}

const getProject=function(req,res)
{
  Project.find({},function(err,data){
    if(err)
    {
      console.log(err);
      return;
    }
    else
    {
      return res.json(data);
    }
  }).sort({_id: -1})
}
const logoutUserAttendance=function(req,res)
{
  let currentdate=new Date();
  currentdate=currentdate.toDateString();
  UserAttendance.aggregate([{
    "$match":{userID:req.body.userID}
  }],function(err,data){
    if(err)
    {
      console.log(err);
      return;
    }
    else
    {
      for(let i=0;i<data.length;i++)
      {
        if(data[i].startDate && (data[i].startDate).toDateString()===currentdate)
        {
          UserAttendance.findByIdAndUpdate(data[i]._id,{endDate:new Date()},function(err,updatedObj){
            if(err)
            {
              console.log(err);
              return;
            }
            else
            {
              return res.json({massage:"logout successfully"});
            }
          })
        }
        
         
      }
      return res.json({massage:"user has not loggedin"});
        
    }
  })
}

const leaveupdate=function(req,res)
{
  Leave.findByIdAndUpdate(req.body.leaveId,{status:req.body.status},function(err,updated){
    if(err)
    {
      console.log(err);
      return ;
    }
    else
    {
      return res.json({massage:"leave updated successfully"});
    }
  })
}
const getleave=function(req,res)
{
  Leave.find({},function(err,data){
    if(err)
    {
      console.log(err);
      return;
    }
    else
    {
      return res.json(data);
    }
  }).sort({_id:-1});
}

module.exports = { 
  insert,
  getTask,
  getProject,
  profile,
  logoutUserAttendance,
  leaveupdate,
  getleave,

};
