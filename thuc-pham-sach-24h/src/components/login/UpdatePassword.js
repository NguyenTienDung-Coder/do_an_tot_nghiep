import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { clearErrors, updatePassword } from "../../actions/userAction";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import MetaData from "../Cart/MetaData";


const UpdatePassword = () => {
  const dispatch = useDispatch();
  const { error, isUpdated, loading } = useSelector((state) => state.profile);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  let history = useHistory();
  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = {
      oldPassword,
      newPassword,
      confirmPassword,
    };
    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert("Updated Successfully");
      history.push("/edit-account");
      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, alert, history, isUpdated]);

  return (
    <Fragment>
      <MetaData title="Change Password" />
      <div className="updatePasswordContainer">
        <div className="updatePasswordBox">
          <form
            encType="multipart/form-data"
            className="updatePasswordForm"
            onSubmit={updatePasswordSubmit}
          >
            <div>
              <label className="login-text" htmlFor="">
                Mật khẩu hiện tại (bỏ trống nếu không đổi)
              </label>
            </div>
            <input
              className="nhap-thong-tin"
              type="password"
              placeholder="Mật khẩu cũ"
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <div>
              <label className="login-text" htmlFor="">
                Mật khẩu mới (bỏ trống nếu không đổi)
              </label>
            </div>
            <input
              className="nhap-thong-tin"
              type="password"
              placeholder="Mật khẩu mới"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <div>
              <label className="login-text" htmlFor="">
                Xác nhận mật khẩu mới
              </label>
            </div>
            <input
              className="nhap-thong-tin"
              type="password"
              placeholder="Xác nhận mật khẩu"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div className="gap"></div>
            <input
              type="submit"
              value="Lưu thay đổi"
              className="updatePasswordBtn"
            />
            <div className="gap"></div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdatePassword;