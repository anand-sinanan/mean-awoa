var express = require('express');

var Users = require('../models/users');
var passport = require('passport');

var router = express.Router();


router.get('/', function (req, res) {
    res.json({ user : req.user });
});

router.get('/register', function(req, res) {
     res.json(req);
 });

router.post('/register', function(req, res) {
    console.log(req);
    Users.register(new Users({ username : req.body.username, email:req.body.email, firstName:req.body.firstName, lastName:req.body.lastName }), req.body.password, function(err, account) {
        if (err) {

            return res.json(err);
        }

        passport.authenticate('local')(req, res, function () {
            res.json(
              {
                message: "Registered! (and signed in too, still deciding on link send, fb, twit etc.)",
                level: "success",
                user: account.fullname
              }
            );
        });
    });
});

router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});

router.post('/login', function(req, res) {

  passport.authenticate('local', function(err, user, info){
    //var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if(user){
      //token = user.generateJwt();
      res.status(200);
      res.json(
          {
            "message" : "Login successful",
            "username": user.username,
            "token"   : user.salt + user.id + user.hash
          }
        );
    } else {
      // If user is not found
      res.json(info);
    }
  })(req, res);


});

router.get('/logout', function(req, res) {
    req.logout();

    res.json({ "message": "Log out successful" });
});

router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});

module.exports = router;
