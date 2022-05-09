import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import "./login.css";
import { clearErrors, login, register } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { loadUser } from "../../actions/userAction";

function Login() {
  const dispatch = useDispatch();
  let history = useHistory();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const userInfo = useSelector((state) => state.user);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = user;
  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
  const loginSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
    const token = userInfo.user;
  };
  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = {
      name,
      email,
      password,
      avatar,
    };
    dispatch(register(myForm));
  };
  const registerDataChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      // hop le
      dispatch(loadUser());
      history.push("/");
    }
  }, [dispatch, error, history, isAuthenticated]);
  return (
    <div className="login-function">
      <div className="login-register">
        <form onSubmit={loginSubmit}>
          <div className="login">
            <h3 className="uppercase">Đăng nhập</h3>
            <label className="login-text" htmlFor="">
              Tên tài khoản hoặc địa chỉ email *
            </label>
            <input
              className="input-inf-acc"
              type="email"
              required
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <label className="login-text" htmlFor="">
              Mật khẩu *
            </label>
            <input
              className="input-inf-acc"
              type="password"
              required
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <div className="box-inf">
              <Checkbox id="link-checkbox" />
              <label className="login-text" htmlFor="link-checkbox">
                Ghi nhớ mật khẩu *
              </label>
            </div>
            <Button type="submit" variant="contained" color="success">
              Đăng nhập
            </Button>
            <p className="forgot-password">
              <a className="a-forgot-password" href="/password/forgot">
                Quên mật khẩu?
              </a>
            </p>
          </div>
        </form>
        <form
          method="POST"
          encType="multipart/form-data"
          onSubmit={registerSubmit}
        >
          <div className="register">
            <h3 className="uppercase">Đăng kí</h3>
            <label className="login-text" htmlFor="">
              Name *
            </label>
            <input
              className="input-inf-acc"
              type="text"
              required
              name="name"
              value={name}
              onChange={registerDataChange}
            />
            <label className="login-text" htmlFor="">
              Địa chỉ email *
            </label>
            <input
              className="input-inf-acc"
              type="email"
              required
              name="email"
              value={email}
              onChange={registerDataChange}
            />
            <label className="login-text" htmlFor="">
              Password *
            </label>
            <input
              className="input-inf-acc"
              style={{ marginBottom: "12px" }}
              type="password"
              required
              name="password"
              value={password}
              onChange={registerDataChange}
            />
            <Button type="submit" variant="contained" color="success">
              Đăng kí
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
