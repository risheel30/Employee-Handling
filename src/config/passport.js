const passport=require("passport");
const localStrategy=require("passport-local").Strategy;
const User=require("../model/User");






passport.use(
    new localStrategy(
      {
        usernameField: "company_emailID",
      },
      function (company_emailID, password, done) {
        User.findOne({ company_emailID: company_emailID }, function (err, user) {
          if (err) {
            console.log("Error finding user");
            return done(err);
          }
          if (!user || user.password != password) {
            console.log("Invalid Password");
            return done(null, false,{error: 201, message: "id passowrd is wrong"});
          }
          return done(null, user);
        });
      }
    )
  );


passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      if (err) {
        console.log("Error in finding user");
        return done(err);
      }
      done(null, user);
    });
  });
  
  passport.checkAuthenticate=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/users/signin');
}
passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user=req.user; 
    }
    next();
}
module.exports=passport;
