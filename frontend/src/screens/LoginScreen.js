import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions/userActions";

const LoginScreen = ({ location, history }) => {
  const [user_name, setUser_name] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, loading, error } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (user_name === "" || password === "") {
      setMessage("Please fill all fields");
    } else {
      dispatch(login(user_name, password));
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
            <input
              type='text'
              className='customer-signin-form-input'
              placeholder='user_name Address'
              required
              value={user_name}
              onChange={(e) => setUser_name(e.target.value)}
            />
          </div>
          <div className='customer-signin-form-group'>
            <input
              type='password'
              className='customer-signin-form-input'
              placeholder='Password'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='customer-signin-form-group'>
            <div className="align-buttons">
              <button type='submit' className='customer-signin-btn'>
                Log In
              </button>

              <Link to='/forgot-password' className='customer-signin-forgot-link'>
                <button type='submit' className='customer-signin-btn'>
                  Forgot Password
                </button>
              </Link>
            </div>
          </div>
          <Link to='/register' className='customer-signin-forgot-link'>
            Click to REGISTER !!!
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
