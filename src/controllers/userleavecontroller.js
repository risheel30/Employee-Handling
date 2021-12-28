const Leave=require("../model/Leave");

const insert=function(req,res)
{
    req.body.userID=req.user._id
    req.body.startDate=new Date(req.body.startDate);
    req.body.endDate=new Date(req.body.endDate);
    Leave.create(req.body,function(err,data){
        if(err)
        {
            console.log(err);
            return ;
        }
        else
        {
            return res.json({massage:"leave inserted successfully"});
        }
    })
}
const update=function(req,res)
{
    if(req.body.startDate)
        req.body.startDate=new Date(req.body.startDate);
    if(req.body.endDate)
        req.body.endDate=new Date(req.body.endDate);
    Leave.findByIdAndUpdate(req.body.leaveId,req.body,function(err,updatedData){
        if(err)
        {
            console.log(err);
            return;
        }
        else
        {
            return res.json({massage:"leave updated successfully"});
        }
    })
}
const deleteleave=function(req,res)
{
    Leave.findByIdAndUpdate(req.body.leaveId,{is_Deleted:true},function(err,updatedData){
        if(err)
        {
            console.log(err);
            return;
        }
        else
        {
            return res.json({massage:"leave deleted successfully"});
        }
    })
}
const getleave=function(req,res)
{
    var date = new Date("2015-08-25T15:35:58.000Z");
    var seconds = date.getTime() / 1000;
    Leave.find({userID:req.user._id},function(err,data){
        if(err)
        {
            console.log(err);
            return;
        }
        else
        {
            //console.log(data.length);
            if(data.length)
            {
                for(let i=0;i<data.length;i++)
                {
                    
                    // if(((data[i].endDate).getTime()/1000)>seconds)
                    // {
                    //     //console.log((data[i].endDate).getTime()+ "----" +seconds)
                    //     Leave.findByIdAndUpdate(data[i]._id,{status:"rejected"},function(err,updated){
                    //         if(err)
                    //         {
                    //             console.log(err);
                    //             return ;
                    //         }
                    //     })
                    // }
                     if(i+1===data.length)
                    {
                        //console.log("ok");
                        Leave.aggregate([{
                            "$match":{userID:req.user._id,is_Deleted:false}
                        }],function(err,data)
                        {
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
                }
            }
            else
            {
                return res.json({massage:"no data found"})
            }
        }
    })
}
module.exports={
    insert,
    update,
    deleteleave,
    getleave,
}