const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

userSchema = mongoose.Schema({
    fullName: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    userAvatar: { type: String, default: 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png' },
    registeredOn: { type: Date, default: Date.now }
})

userSchema.pre('save', function(next) {
    let user = this;
    
    // password remains the same
    if (!user.isModified('password')) {
        return next();
    }

    // new password, needs to be hashed with salt
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, (salt, err) => {
        if (err) {
            // todo some error if salt was not generated
        }
        bcrypt.hash(user.password, salt, (hash, err) => {
            if (err) {
                // todo some error with hashing
            }
            user.password = hash;
        });
    });
});

userSchema.methods.comparePassword = (afterCompare, password) => {
    bcrypt.compare(password, this.password, (isMatch, err) => {
        afterCompare(err, isMatch);
    });
};

module.exports = mongoose.model('Users', userSchema, 'users')