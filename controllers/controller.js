const User = require('../public/server/models/model')
const token = require('../config/secrets/token')

module.exports = {
  welcome = function(req, res){
    return res.status(200).json({ message: 'Welcome to Yourtube Api'});
  },
 
  registerUser = function(req, res) {
 
    User.findOne({ email: req.body.email }, '+password', function(err, existingUser) {
      if (existingUser) {
        return res.status(409).json({ message: 'Email is already taken' });
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
        res.send({ token: token.createJWT(result) });
      });
    });
  },
 
  getLoggedInUserDetail = function(req, res) {
    User.findById(req.user, function(err, user) {
      res.send(user);
    });
  },
 
  updateLoggedInUserDetail = function(req, res) {
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
 
  authenticate = function(req, res) {
 
    User.findOne({ email: req.body.email }, function(err, user) {
      if (!user) {
        return res.status(401).json({ message: 'Invalid Email' });
      }
 
      user.comparePassword(req.body.password, function(err, isMatch) {
        if (!isMatch) {
          return res.status(401).json({ message: 'Invalid Password' });
        }
        res.send({ token: token.createJWT(user) });
      });
    });
  }
}