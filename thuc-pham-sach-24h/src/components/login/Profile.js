import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updateProfile, loadUser } from "../../actions/userAction";
import { useHistory } from "react-router-dom";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  let history = useHistory();

  const updateProfileSubmit = (e) => {
    e.preventDefault();
    const myForm = {
      name,
      email,
    };
    dispatch(updateProfile(myForm));
  };
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      
    }
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      dispatch(loadUser());
      history.push("/edit-account");
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, alert, history, user, isUpdated]);
  return (
        <Fragment>
          <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
          <div>
              <label className="login-text" htmlFor="">
                Tên hiển thị *
              </label>
              <input
                    className="nhap-thong-tin"
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

            </div>
            <div>
              <label className="login-text" htmlFor="">
                Địa chỉ mail *
              </label>

              <input
                    className="nhap-thong-tin"
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn"
                />
        </form>

        </Fragment>

  );
};

export default Profile;
