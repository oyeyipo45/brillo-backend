import React from 'react';
import { Link } from 'react-router-dom';

const ConfirmationScreen = () => {
  return (
    <div className='bidlist-screen'>
      <div className='home-body'>
        <h2 className='section-title'>
          Please take a moment to verify your email address. We sent an email with a verification link to oyeyipo45@gmail.com. If you didn't receive
          the email, check your spam folder
        </h2>
      </div>

      <div className='home-body'>
        <h2 className='section-title'>Get confirmation code with phone number</h2>
      </div>

      <Link to='/login' className='customer-signin-forgot-link'>
        Click to LOGIN !!!
      </Link>
    </div>
  );
};

export default ConfirmationScreen;
