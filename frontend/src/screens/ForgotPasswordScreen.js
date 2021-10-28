import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../redux/actions/userActions';

const ForgotPasswordScreen = ({ location, history }) => {
  const [user_name, setUser_name] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, loading, error } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!user_name) {
      setMessage('Please fill all fields');
    } else {
      dispatch(resetPassword(user_name));
    }
  };

  return (
    <div className='login'>
      <div className='customer-signin'>
        <div className='customer-signin-header'>
          <h3 className='customer-signin-heading'>Log In</h3>

          {message && <p>{message}</p>}
          {error && <p className='color-red'>{error}</p>}
          {loading && 'LOADING  ......'}
        </div>

        <form action='' onSubmit={submitHandler} className='customer-signin-form'>
          <div className='customer-signin-form-group'>
            <label htmlFor="Email"> Email </label>
            <input
              type='email'
              className='customer-signin-form-input'
              placeholder='Email Address'
              required
              value={user_name}
              onChange={(e) => setUser_name(e.target.value)}
            />
          </div>
          <div className=''>
            <div className='align-buttons'>
              <button type='submit' className='customer-signin-btn'>
                Reset Password
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordScreen;
