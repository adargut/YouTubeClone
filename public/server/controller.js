const User = require('../server/models/model.js')
const token = require('../../config/token')
const gravatar = require('gravatar')
const marker = require('@ajar/marker');
const { use } = require('../../routers/api.js');
const { err } = require('@ajar/marker');

module.exports = {
    /**
     * Welcome Notice
     * @param  req
     * @param  res
     * @return Void
     */
    welcome: function(req, res){
      return res.status(200).json({ message: 'Welcome to Yourtube Api'});
    },
   
    /**
     * Register User with Full Name, Email and password
     * @param  req
     * @param  res
     * @return Void
     */
    registerUser: function(req, res) {
   
      User.findOne({ email: req.body.email }, '+password', function(err, existingUser) {
        if (existingUser) {
          // localStorage.setItem("hi", 1)
          // res.
          // localStorage.setItem('image', 'myCat.png');
          // res.send({success: true, message: '<li>New list item number 1</li><li>New list item number 2</li>'});
          return res.redirect('/auth/signup/?valid=false')
          // return res.status(409).json({ message: 'Email is already taken' });
        }
   
        // Obtain the avatar from gravatar service
        var secureImageUrl  = gravatar.url(req.body.email, {s: '200', r: 'x', d: 'retro'}, true);
   
        var user = new User({
          fullName: req.body.fullName,
          email: req.body.email,
          password: req.body.password,
          user_avatar: secureImageUrl
        });
   
        user.save(function(err, result) {
          if (err) {
            res.status(500).json({ message: err.message });
          }
          console.log('what is result? ' + result)
          res.cookie('jwt', token.createJWT(result), { maxAge: 900000, httpOnly: true })
          marker.i('Redirecting user to homepage..')
          return res.redirect('/');
        });
      });
    },
   
    /**
     * Fetch Logged In User Details
     * @param   req
     * @param   res
     * @param   next
     * @return  Void
     */
    getLoggedInUserDetail: function(req, res) {
      User.findById(req.user, function(err, user) {
        res.send(user);
      });
    },
   
    /**
     * Update Logged In User Details
     * @param   req
     * @param   res
     * @return  json | void
     */
    updateLoggedInUserDetail: function(req, res) {
      User.findById(req.user, function(err, user) {
        if (!user) {
          return res.status(400).send({ message: 'User not found' });
        }
   
        user.fullName = req.body.fullName || user.fullName;
        user.email    = req.body.email || user.email;
   
        user.save(function(err) {
          res.status(200).send({ message: 'Profile Update Succesfully'});
        });
      });
    },
   
    /**
     * Authenticate a User via Email and Password
     * @param  req
     * @param  res
     * @return json
     */
    authenticate: function(req, res) {
   
      User.findOne(req.body.user).then((user) => {
        if (!user) return res.status(401).send({ error: "Username not found" });
        user.comparePassword(req.body.password, (err, isMatch) => {
          if (!isMatch) return res.status(401).send({ error: "Incorrect password" });
          if (err) return res.status(401).send({ error: err });
          res.cookie('jwt', token.createJWT(user), { maxAge: 900000, httpOnly: true })
          marker.i('Redirecting to homepage...')
          return res.redirect('/');
        })
      })
      .catch(error => {
        marker.e(error);
      })
    }
  };