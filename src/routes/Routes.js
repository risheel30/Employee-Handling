const express = require("express");
const userRouter=require("./user");
const admin=require("./admin")



const router = express.Router();
console.log("Router Up!!");

router.use('/users', userRouter);
router.use('/admin',admin);






module.exports = router;