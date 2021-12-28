const express =require('express');
const userController=require("../controllers/usercontrollers")
const passport=require("passport");
const passportlocal=require("../config/passport");
const multer=require("multer")
const uuid=require("uuid")
const attendanceController=require("../controllers/userAttendance");
const userleaveController=require("../controllers/userleavecontroller");
// const upload = multer({ dest: 'views/upload/' })


// const stroges=multer.diskStorage({
//     destination:function(req,file,cb){
//         cb(null,'views/upload')
//     },
//     filename:function(req,file,cb){
//         console.log(file+"ok");
//         let fileExtension = path.extname(file.originalname).split('.')[1];
//         cb(null,Date.now()+fileExtension)
//     }
// })

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'views/upload')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + uuid.v4().toString() + "-" + file.originalname)
    }
});

const upload = multer({
    storage: storage,
    limits:{
        fileSize:1024*1024*5
    }
})

const cpUpload = upload.fields([{ name: 'candidatePhoto', maxCount: 1 }, { name: 'proof', maxCount: 3 },{name: 'letter', maxCount: 3}])
const router=express.Router();
router.get('/profile',passport.checkAuthenticate,userController.profile);
router.post('/signin', passport.authenticate('local',{failureRedirect : '/users/failurejson'}),userController.signIn);
//router.get('/signup',userController.signUp);
router.get('/signout',userController.destroySession);
router.post('/create',userController.create);
router.put('/update',passport.checkAuthenticate,cpUpload,userController.update);
router.get('/getProject',passport.checkAuthenticate,userController.getProject);
router.post('/addTask',passport.checkAuthenticate,userController.addTask);
router.get('/getTask',passport.checkAuthenticate,userController.getTask);
router.get('/failurejson',userController.fail);


router.get('/attendancelogin',passport.checkAuthenticate,attendanceController.create);
router.get('/attendancelogout',passport.checkAuthenticate,attendanceController.logout);
router.get('/attendancedata',attendanceController.attendanceData);
router.put('/attendancedelete',attendanceController.attendanceDelete);



router.post('/insertleave',passport.checkAuthenticate,userleaveController.insert);
router.put('/updateleave',passport.checkAuthenticate,userleaveController.update);
router.put('/deleteleave',passport.checkAuthenticate,userleaveController.deleteleave);
router.get('/getleave',passport.checkAuthenticate,userleaveController.getleave);



module.exports=router;