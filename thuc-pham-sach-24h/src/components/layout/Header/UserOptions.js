import React, { Fragment, useState } from "react";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useHistory } from "react-router-dom";
import { logout } from "../../../actions/userAction";
import { useDispatch } from "react-redux";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { StylesProvider } from "@mui/styles";
import "./UserOptions.css";

const UserOptions = ({ user }) => {
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];

  if (user && user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }
  function dashboard() {
    history.push("/admin/Dashboard");
  }

  function orders() {
    history.push("/orders");
  }

  function account() {
    history.push("/edit-account");
  }

  function logoutUser() {
    dispatch(logout());
    alert("Logout Successfully");
    history.push("/");
  }
  // const

  return (
    <Fragment>
      <StylesProvider>
        {/* <Backdrop open={open} style={{ zIndex: "10" }} /> */}
        <SpeedDial
          style={{ zIndex: "10" }}
          ariaLabel="SpeedDial tooltip example"
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          direction="down"
          className="speedDial"
          icon={<AccountCircleIcon />}
        >
          {options.map((item) => (
            <SpeedDialAction
              style={{ zIndex: "11" }}
              key={item.name}
              icon={item.icon}
              tooltipTitle={item.name}
              onClick={item.func}
              tooltipOpen={window.innerWidth <= 600 ? true : false}
            />
          ))}
        </SpeedDial>
      </StylesProvider>
    </Fragment>
  );
};

export default UserOptions;
