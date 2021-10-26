import crypto  from 'crypto';
import mongoose  from 'mongoose';
import bcrypt  from 'bcryptjs';
import jwt  from 'jsonwebtoken';

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, 'Please enter name'],
    },
    email: {
      type: String,
      require: [true, 'Please enter email'],
      unique: true,
      match: [
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please add a valid email',
      ],
    },
    phone_number: {
      type: String,
      require: [true, 'Please enter last phone number'],
      unique: true,
    },
    interest: {
      type: String,
      require: [true, 'Please enter interest'],
      enum: ['Football', 'Basketball', 'Ice Hockey', 'Motorsports', 'Bandy', 'Rugby', 'Skiing', 'Shooting'],
    },
    password: {
      type: String,
      require: [true, 'Please enter password'],
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    confirmSignupToken: {
      type: String,
      select: false,
      require: true,
    },
    confirmSignupExpire: {
      type: Date,
      select: false,
    },
    verified: {
      type: Boolean,
      require: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Encrypt password using bcrypt
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and hash password token
UserSchema.methods.getResetPasswordToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  // Set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

// Generate and hash signup token
UserSchema.methods.getConfirmSignupToken = function () {
  // Generate token
  const confirmToken = crypto.randomBytes(20).toString('hex');
  // Hash token and set to confirmSignupToken field
  this.confirmSignupToken = crypto.createHash('sha256').update(confirmToken).digest('hex');
  // Set expire
  this.confirmSignupExpire = Date.now() + 60 * 60 * 24 * 1000;
  return confirmToken;
};

const User = mongoose.model('User', UserSchema);

export default User;
