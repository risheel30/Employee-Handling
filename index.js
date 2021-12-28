const express = require("express");
const { json, urlencoded } = require("body-parser");
const cors=require("cors");
const session =require("express-session");
const connect=require("./src/config/database");
const router=require("./src/routes/Routes");
const passport=require("passport");
const mongoStore = require("connect-mongo");
const passportlocal=require("./src/config/passport");



const app=express();

app.use(cors());
app.use(json());
app.use(urlencoded());
app.use(
  session({
    name: "RoxonTechnologies",
    secret: "Roxon Technologies",
    resave: false,
    cookie: {
      maxAge: 600000,
    },
    store: new mongoStore({
      mongoUrl:'mongodb://localhost:27017/Company_Panel',
      autoRemove: "disable",
    }),
  },function(err){
    if(err){
      console.error(err);

    }
    console.log('connect-mongo setup done');
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);


app.use('/',router)


app.listen(3000,async()=> {
  try{
    const check=  await connect()
    console.log("databse connected!!");
    console.log("server stared at 3000!!");
  }
  catch(err){
    console.log(err);
  }
});


  
  