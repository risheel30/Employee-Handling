const Task=require("../model/Task")
const UserAttendance=require("../model/UserAttendance");

const create=function(req,res)
{
    UserAttendance.aggregate([{
        "$match":{userID:req.user._id,startDate:{     
            $gte:   new Date(new Date().setHours(00,00,00)) ,     
            $lt :  new Date(new Date().setHours(23,59,59)) 
       } }
    }],function(err,data){
        if(err)
        {
            console.log(err);
            return ;
        }
        else
        {
            if(data.length)
            {
                console.log(data.length);
                return res.json({massage:"already login"});
            }
            else
            {
                let attendanceData={
                    userID:req.user._id,
                }
                UserAttendance.create(attendanceData,function(err,loginObj){
                    if(err)
                    {
                        console.log(err);
                        return ;
                    }
                    else
                    {
                        return res.json({massage:"login successfully"});
                    }
                })
            }
            
            
            

        }
        
    })
}

const logout = function(req,res)
{
    let currentdate=new Date();

    currentdate=currentdate.toDateString();
    Task.aggregate([{
        "$match":{userID:req.user._id,startDate:{     
            $gte:   new Date(new Date().setHours(00,00,00)) ,     
            $lt :  new Date(new Date().setHours(23,59,59)) 
       } }
    }],function(err,data){
        if(err)
        {
            console.log(err);
            return ;
        }
        else{
            if(!data.length)
            {
                return res.json({massage:"assign task first"})
            }
            else
            {
                UserAttendance.findById(req.body.attendanceId,function(err,Obj){
                    if(err)
                    {
                        console.log(err);
                        return;
                    }
                    else
                    {
                        if(Obj && Obj.endDate)
                        {
                            return res.json({massage:"already loggedout"})
                        }
                        else
                        {
                            UserAttendance.findByIdAndUpdate(req.body.attendanceId,{endDate:new Date()},function(err,updatedObj){
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
                    
                    })
                                 
            }
            //console.log(data);
        }
     
        
    })
    
}
const attendanceDelete=function(req,res)
{
    UserAttendance.findByIdAndUpdate(req.body.attendanceId,{is_deleted:true},function(err,data){
        if(err)
        {
            console.log(err);
            return ;
        }
        else
        {
            return res.json({massage:"deleted successfully"});
        }
    })
}

const attendanceData=function(req,res)
{
    UserAttendance.findById(req.user._id,function(err,data){
        if(err)
        {
            console.log(err);
            return;
        }
        else
        {
            return res.json(data);
        }
    })
}

module.exports={
    attendanceData,
    attendanceDelete,
    logout,
    create,
}