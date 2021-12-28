const express =require('express');
const passport=require("passport");
const adminController=require("../controllers/admincontrollers")

const router=express.Router();

router.post('/insertProject',passport.checkAuthenticate,adminController.insert);
router.get('/profile',passport.checkAuthenticate,adminController.profile);
router.get('/gettask',passport.checkAuthenticate,adminController.getTask);
router.get('/getleave',passport.checkAuthenticate,adminController.getleave);
router.get('/getproject',passport.checkAuthenticate,adminController.getProject);
router.post('/logoutuserattendance',passport.checkAuthenticate,adminController.logoutUserAttendance);
router.put('/updateleave',passport.checkAuthenticate,adminController.leaveupdate);

module.exports=router;