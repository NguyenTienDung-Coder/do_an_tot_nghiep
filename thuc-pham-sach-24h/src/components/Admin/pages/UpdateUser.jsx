import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  clearErrors,
  getUserDetails,
  updateUser,
} from "../../../actions/userAction";
import { UPDATE_USER_RESET } from "../../../constants/userConstants";
import MetaData from "../../Cart/MetaData";
import Loader from "../../Loader/Loader";
import Sidebar from "../Sidebar";
import {
  ButtonD,
  ContainerD,
  InputUpdate,
  SelectUpdate,
} from "../style/dashboard.styled";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PersonIcon from "@mui/icons-material/Person";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { Button, ButtonBase } from "@mui/material";

export default function UpdateUser() {
  let history = useHistory();
  const dispatch = useDispatch();
  let match = useParams();

  const { loading, error, user } = useSelector((state) => state.userDetails);

  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const userId = match.id;

  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert("Cập nhập người dùng thành công");
      history.push("/admin/Dashboard/User");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, alert, error, history, isUpdated, updateError, user, userId]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = {
      name,
      email,
      role,
    };

    dispatch(updateUser(userId, myForm));
  };

  return (
    <Fragment>
      <MetaData title="Update User" />

      <ContainerD>
        <Sidebar />
        <div className="dashboard">
          <div className="newProductContainer">
            {loading ? (
              <Loader />
            ) : (
              <form
                className="createProductForm"
                onSubmit={updateUserSubmitHandler}
              >
                <h1>Cập nhập thông tin người dùng</h1>

                <div>
                  <PersonIcon />
                  <InputUpdate
                    type="text"
                    placeholder="Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <MailOutlineIcon />
                  <InputUpdate
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <VerifiedUserIcon />
                  <SelectUpdate
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="">Choose Role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </SelectUpdate>
                </div>

                <Button
                  style={{ margin: "10px 43px" }}
                  variant="contained"
                  color="success"
                  id="createProductBtn"
                  type="submit"
                  disabled={
                    updateLoading ? true : false || role === "" ? true : false
                  }
                >
                  Cập nhập
                </Button>
              </form>
            )}
          </div>
          <ButtonD href="/admin/Dashboard">
            Trở về bảng điều khiển
          </ButtonD>
        </div>
      </ContainerD>
    </Fragment>
  );
}
