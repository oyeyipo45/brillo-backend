import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/actions/userActions";

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("");
  const [phone_number, setPhone_number] = useState('');
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_password] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push('/confirmation');
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {

   console.log( name , email , interest , password , phone_number , confirm_password)
    e.preventDefault();
    if (password !== confirm_password) {
      setMessage("password do not match");
    } else if (!name || !email || !interest || !password || !phone_number || !confirm_password) {
      setMessage("Please fill all fields ");
    } else {
      dispatch(register(name, email, interest, phone_number, password, confirm_password));
    }
  };
  return (
    <div className='register'>
      <div className='customer-signup'>
        <div className='customer-signup-header'>
          <h3 className='customer-signup-heading'>Create an account</h3>

          {message && <p>{message}</p>}
          {error && <p className='color-red'>{error}</p>}
          {loading && 'Loading ...'}
        </div>

        <form action='' onSubmit={submitHandler}>
          <div className='customer-signup-form-group'>
            <input
              type='text'
              className='customer-signup-form-input'
              placeholder='Full Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className='customer-signup-form-group'>
            <input
              type='email'
              className='customer-signup-form-input'
              placeholder='Email Address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='customer-signup-form-group'>
            <input
              type='tel'
              className='customer-signup-form-input'
              placeholder='Phone Number'
              value={phone_number}
              onChange={(e) => setPhone_number(e.target.value)}
              required
            />
          </div>
          <div className='customer-signup-form-group'>
            <select className='customer-signup-form-input' onChange={(e) => setInterest(e.target.value)} value={interest} name='Interest'>
              <option value=''>Select Interest</option>
              <option value='Football' defaultValue>
                {' '}
                Football{' '}
              </option>
              <option value='Basketball'>Basketball</option>
              <option value='Ice Hockey'>Ice Hockey</option>
              <option value='Motorsports'>Motorsports</option>
              <option value='Bandy'>Bandy</option>
              <option value='Rugby'>Rugby</option>
              <option value='Skiing'>Skiing</option>
              <option value='Shooting'>Shooting</option>
            </select>
          </div>
          <div className='customer-signup-form-group'>
            <input
              type='password'
              className='customer-signup-form-input'
              placeholder='Password'
              minLength='6'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type='password'
              className='customer-signup-form-input'
              placeholder='Confirm Password'
              minLength='6'
              value={confirm_password}
              onChange={(e) => setConfirm_password(e.target.value)}
              required
            />
          </div>
          <div className='customer-signup-form-group'>
            <button type='submit' className='customer-signup-btn'>
              Create my account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterScreen;
