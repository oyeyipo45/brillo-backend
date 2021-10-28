import User from '../models/user.js';
import asyncHandler from 'express-async-handler';
import ErrorResponse from '../utils/errorResponse.js';
import sendEmail from "../utils/sendEmail.js"
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();



const registerUser = asyncHandler(async (req, res, next) => {
  // User input
  const { name, email, password, interest, phone_number, confirm_password } = req.body;

  // Validate User input
  if (!name || !email || !password || !interest ||  !phone_number || !confirm_password) {
      return next(new ErrorResponse('Please Fill All Fields', 400));  
  }

  if (password !== confirm_password) {
    return next(new ErrorResponse('Passwords do not match', 400));
  }

  const userExists = await User.findOne({ email });

  // Validate for existing user with entered email
  if (userExists) {
    return next(new ErrorResponse('A user already exists with the email', 400));
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    phone_number,
    interest,
    profile_picture: 'https://ih1.redbubble.net/image.1046392278.3346/aps,504x498,small,transparent-pad,600x600,f8f8f8.jpg',
  });

  if (user) {
    // Get signup confirmation token
    const signupToken = user.getConfirmSignupToken();
    await user.save({
      validateBeforeSave: false,
    });

    // Create and send confirmation email
    const signupConfirmUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/confirm_signup/${signupToken}`;
    const message =
      `Hi ${user.name},
      <br><br>To verify your email address (${user.email}),
      Please
        <a href="${signupConfirmUrl}"> Click here</a> OR <br><br> Copy and paste the link below in your browser <br>
        <a href="${signupConfirmUrl}">${signupConfirmUrl}</a>
        <br><br>Thank you, <br>Brillo`;

    try {
      await sendEmail({
        brand_name: "Brillo",
        email: user.email,
        subject: 'Please verify your email address',
        message,
      });
    } catch (err) {
      console.log(err)
      return next(new ErrorResponse('Email could not be sent', 500));
    }

     return res.status(200).json({
       success: true,
       message: `Please take a moment to verify your email address. We sent an email with a verification link to ${email}. If you didn't receive the email, check your spam folder`,
     });
  } 
  
  return next(new ErrorResponse('Unable to create user, an error occured', 400));
  
});

const confirmEmail = asyncHandler(async (req, res, next) => {

  // Get hashed token
  const confirmSignupToken = crypto
    .createHash("sha256")
    .update(req.params.confirmToken)
    .digest("hex");
  
  console.log(confirmSignupToken)
  
  // Find user with token
  const user = await User.findOne({ confirmSignupToken });

  // Return error if no user is found
  if (!user) {
    return next(new ErrorResponse("Invalid token", 400));
  }

  // Confirm user
  const updatedUser = await User.updateOne(
    {
      _id: user._id,
    },
    {
      $set: {
        verified: true,
        confirmSignupToken: undefined,
      },
    }
  );
  
  // Set token response to redirect user to login page
  sendConfirmResponse(user, 200, res);
});

const login = asyncHandler(async (req, res, next) => {
  
  const { user_name , password } = req.body;

  try {

    // Validate user_name and password
    if (!user_name || !password) {
      return next(new ErrorResponse('Please fill all fields', 400));
    }

    // Find user with email or phone_number
    const user = await User.findOne({
      $or: [
        { email: user_name },
        {
          phone_number: user_name,
        },
      ],
    }).select('+password');

    if (!user) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }

    // Throw error is user has not been verified
    if (!user.verified) {
      return next(new ErrorResponse('Please verify your email before you can login', 401));
    }

    if (user) {
      // Check if password matches then login user
      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return next(new ErrorResponse('Invalid credentials', 401));
      }

      // Send response
      sendTokenResponse(user, 200, res);
    }
  } catch (error) {
    console.log(error)
    return next(new ErrorResponse('Internal server error', 500));
  }

});

// Get token from model, create cookie and send response
const sendTokenResponse = async (user, statusCode, res) => {
  user.password = undefined;
  user.__v = undefined;
  user.resetPasswordExpire = undefined;
  user.resetPasswordToken = undefined;

  // Create token
  try {
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }
 
  res.status(statusCode).json({
    success: true,
    token,
    user,
  });
  } catch (error) {
    console.log(error)
    return next(new ErrorResponse('Internal server error', 500));
  }
};

// Get token from model, create cookie and redirect to dashboard
const sendConfirmResponse = async ( user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  // Redirect to login page
  res.redirect(`${process.env.FRONTEND_URL}`)
};



export { registerUser, login, confirmEmail };