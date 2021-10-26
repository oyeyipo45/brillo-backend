import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import ErrorResponse from '../utils/errorResponse.js';



const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, interest, phoneNumber ,confirmPassword } = req.body;

  // Validate name, email, phoneNumber, interests and password
  if (!name || !email || !password || !interest ||  !phoneNumber || !confirmPassword) {
    // return res.status(400).json({
    //   status: 400,
    //   message: 'Please Fill All Fields',
    // });
      
      return next(new ErrorResponse('Please Fill All Fields', 400));
      
      
  }

  if (password !== confirmPassword) {
    // return res.status(400).json({
    //   status: 400,
    //   message: 'Password do not match',
    // });
    return next(new ErrorResponse('Password do not match', 400));
  }

  // if (!name.trim().match(/^[A-Za-z]+$/)) {
  // 	return res.status(400).json({
  // 		status: 400,
  // 		message:'Name must  be alphabets'});
  // }

  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(email)) {
    return res.status(400).json({
      status: 400,
      message: 'Email do not match correct format',
    });
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmn: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});



export { registerUser };