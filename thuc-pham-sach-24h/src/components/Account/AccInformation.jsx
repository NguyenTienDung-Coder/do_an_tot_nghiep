import "./AccInformation.css";
import UpdatePassword from "../login/UpdatePassword";
import Profile from "../login/Profile";

const AccInformation = () => {
  return (
    <div className="thong-tin-tai-khoan">
      <div className="gap-colum">
        <div className="tai-khoan-nguoi-dung">
          <h1 className="tai">tài khoản</h1>
          <small className="sm">tài khoản</small>
        </div>
      </div>
      <div className="gap"></div>
      <div className="ten-name">
        <div className="name-acc-one">
          <p className="acc-name-p">tài khoản</p>
        </div>
        <div className="name-acc-two">
          <div className="form-inf-acc">
            <Profile/>
            <p className="thay-mk">Thay đổi mật khẩu *</p>
            <UpdatePassword />
            <div className="gap"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccInformation;