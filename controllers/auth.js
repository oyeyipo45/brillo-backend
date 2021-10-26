import User from '../models/user.js';
import asyncHandler from 'express-async-handler';
import ErrorResponse from '../utils/errorResponse.js';
import sendEmail from "../utils/sendEmail.js"



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
    interest
  });

  if (user) {
    // Get signup confirmation token
    const signupToken = user.getConfirmSignupToken();

    // Create and send confirmation email
    const signupConfirmUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/confirm_signup/${signupToken}`;
    const message = `Hi ${user.name},<br><br>To verify your email address (${user.email}), Please
        <a href="${signupConfirmUrl}"> Click here</a> OR <br><br> Copy and paste the link below in your browser <br>
        <a href="${signupConfirmUrl}">${signupConfirmUrl}</a>
        <br><br>Thank you, <br>Brillo`;

    try {
      await sendEmail({
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



export { registerUser };