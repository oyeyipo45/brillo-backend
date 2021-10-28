import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUserDetails } from "../redux/actions/userActions";
import { updateUserProfile } from "../redux/actions/userActions";
import {
  USER_DETAILS_RESET,
  USER_UPDATE_PROFILE_RESET,
} from "../redux/constants/userConstants";

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { user, loading, error } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (!userInfo || !user) {
      history.push("/login");
    } else {
      if (!user || !user.name) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails(userInfo._id));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user, successUpdate, successDelete]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("password do not match");
    } else {
      dispatch(updateUserProfile({ name, email, password, id: user._id }));
    }
  };
  const deleteUserHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch({ type: USER_DETAILS_RESET });
      dispatch(deleteUser(id));
    }
  };
  return (
    <>
      <div className="register">
        <div className="customer-signup">
          <div className="customer-signup-header">
            <h3 className="customer-signup-heading">Edit your details</h3>

            <div>
              {" "}
              {loadingUpdate && "Loading .."}
              {errorUpdate && <p className="color-red">{errorUpdate}</p>}
              {success && <p className="color-green">Profile Updated</p>}
              {message && <p>{message}</p>}
              {error && <p className="color-red">{error}</p>}
              {loading && "Loading ..."}
              <div className="customer-signin-form-group">
                <button
                  className="delete-btn"
                  onClick={() => deleteUserHandler(user._id)}
                >
                  Delete Profile
                </button>
              </div>
            </div>
          </div>

          <form action="" onSubmit={submitHandler}>
            <div className="customer-signup-form-group">
              <input
                type="text"
                className="customer-signup-form-input"
                placeholder="Full Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="customer-signup-form-group">
              <input
                type="email"
                className="customer-signup-form-input"
                placeholder="Email Address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="customer-signup-form-group">
              <input
                type="password"
                className="customer-signup-form-input"
                placeholder="Password"
                minLength="6"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                className="customer-signup-form-input"
                placeholder="Confirm Password"
                minLength="6"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="profile-buttons">
              <div className="customer-signin-form-group">
                <button type="submit" className="customer-signin-btn">
                  Update Profile
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProfileScreen;
