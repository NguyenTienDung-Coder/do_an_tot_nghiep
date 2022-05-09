import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "./header.scss";
import InputIcon, {
  Button,
  Dialog,
  DialogContent,
  IconButton,
  TextField,
} from "@mui/material";
import { Link, useHistory, useParams } from "react-router-dom";
import { InputBase } from "@mui/material";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { grey } from "@mui/material/colors";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import {
  Containernav,
  Spantxt,
  Bannera,
  Menua,
  Inputbar,
  Searchhid,
  Buttonheader,
} from "./style/style.styled";
import ProductCate from "../Product/ProductCate";
import Login from "../login/login";
import { getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../actions/userAction";
import UserOptions from "../layout/Header/UserOptions";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

const categories = ["Hải sản", "Cá", "Mắm", "Thịt"];
Header.proTypes = {};
const LinkItems = styled.div`
  &&& {
    color: black;
    text-decoration: none;
    cursor: pointer;
    &:hover {
      color: #51aa1b;
    }
  }
`;

function Header() {
  const [open, setOpen] = React.useState(false);
  const { cartItems } = useSelector((state) => state.cart);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem button component={Link} to="/">
          <ListItemText primary="Trang Chủ" />
        </ListItem>
        <ListItem button component={Link} to="/gioi-thieu">
          <ListItemText primary="Giới Thiệu" />
        </ListItem>
        <ListItem button component={Link} to="/san-pham">
          <ListItemText primary="Sản Phẩm" />
        </ListItem>
        <ListItem button component={Link} to="/tin-tuc">
          <ListItemText primary="Tin Tức" />
        </ListItem>
        <ListItem button component={Link} to="/meo-hay">
          <ListItemText primary="Mẹo hay" />
        </ListItem>
        <ListItem button component={Link} to="/lien-he">
          <ListItemText primary="Liên hệ" />
        </ListItem>
      </List>
    </Box>
  );
  let history = useHistory();
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/products/${keyword}`);
    } else {
      history.push("/products");
    }
  };
  const navigateHiddenLogin = () => {
    history.push("/login");
  };
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProduct(category));
  }, [dispatch, category]);
  function logoutUser() {
    dispatch(logout());
    alert.success("Logout Successfully");
  }

  const setToCategory = (category) => {
    setCategory(category);
    history.push(`/products/${category}`);
  };
  return (
    <div className="container">
      <div className="header-wrapper">
        <div className="text">
          <Spantxt>Mua rau sạch online TPHCM - Rau tươi online</Spantxt>
          <Buttonheader onClick={handleClickOpen}>
            {!isAuthenticated ? (
              <a href="/login" className="text-a">
                Đăng nhập / Đăng ký
              </a>
            ) : (
              <div className="av">
                <p className="a-tai-khoan">Tài khoản</p>
                <UserOptions className="user-options" user={user} />
              </div>
            )}
          </Buttonheader>
        </div>
        {/* menu hidden */}
        <div className="banner-hidden">
          <div className="menu-hidden">
            {/* raw button */}
            {["left"].map((anchor) => (
              <React.Fragment key={anchor}>
                <Button onClick={toggleDrawer(anchor, true)}>
                  <MenuIcon sx={{ fontSize: 30, color: grey[50] }} />
                </Button>
                <Drawer
                  anchor={anchor}
                  open={state[anchor]}
                  onClose={toggleDrawer(anchor, false)}
                >
                  {list(anchor)}
                </Drawer>
              </React.Fragment>
            ))}

            {/* raw button */}
          </div>
          <div className="logo-hidden">
            <a href="/">
              <img
                src="https://cuahangtienloi24h.com/wp-content/uploads/2021/07/cua-hang-tot-nhat-white.png"
                alt="alt"
              />
            </a>
          </div>

          {!isAuthenticated ? (
            <div className="user-hidden">
              <IconButton onClick={navigateHiddenLogin}>
                <PersonIcon sx={{ fontSize: 30, color: grey[50] }} />
              </IconButton>
            </div>
          ) : (
            <div className="av">
              <UserOptions className="user-options" user={user} />
            </div>
          )}
          <div className="user-hidden">
            <Link to="/gio-hang">
              <IconButton id="buttonIcon">
                <ShoppingCartIcon sx={{ fontSize: 40, color: grey[50] }} />
                <span
                  style={{
                    fontSize: "12px",
                    backgroundColor: "yellow",
                    width: "fit-content",
                    height: "fit-content",
                    borderRadius: "50%",
                    padding: "3px 6px",
                    margin: "0",
                  }}
                >
                  {cartItems.length}
                </span>
              </IconButton>
            </Link>
          </div>
        </div>
        {/* menu hidden */}

        <div className="banner">
          <div>
            <Bannera href="/">
              <img
                style={{ width: "200px" }}
                src="https://cuahangtienloi24h.com/wp-content/uploads/2021/07/cua-hang-tot-nhat-white.png"
                alt="alt"
              />
            </Bannera>
            <div className="form" onSubmit={searchSubmitHandler}>
              <form>
                <input
                  type="text"
                  placeholder="Bạn muốn tìm gì?"
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <button type="submit" className="search-btn">
                  <SearchIcon />
                </button>
              </form>
            </div>
            <div className="contact">
              <div className="icon-phone">
                <LocalPhoneIcon sx={{ color: grey[50] }} />
              </div>
              <div className="straight"></div>
              <div className="contact-line">
                <a href="tel:+037.730.6589">
                  <span>Hotline & zalo</span>
                  <p>037.730.6589</p>
                </a>
              </div>
              <div className="bag">
                <Link to="/gio-hang">
                  <IconButton>
                    <ShoppingCartIcon sx={{ fontSize: 40, color: grey[50] }} />
                    <span
                      style={{
                        fontSize: "12px",
                        backgroundColor: "yellow",
                        width: "fit-content",
                        height: "fit-content",
                        borderRadius: "50%",
                        padding: "3px 6px",
                        margin: "0",
                      }}
                    >
                      {cartItems.length}
                    </span>
                  </IconButton>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* serach-bar hidden */}

        <div className="search-bar-hidden">
          <form onSubmit={searchSubmitHandler}>
            <input
              className="Inputbar"
              placeholder="Bạn muốn tìm gì?"
              type="text"
              onChange={(e) => setKeyword(e.target.value)}
            ></input>
            <button type="submit">
              <SearchIcon sx={{ fontSize: 20, color: grey[50] }} />
            </button>
          </form>
        </div>

        {/* serach-bar hidden */}

        <div className="nav-bar">
          <ul className="nav-left">
            <li style={{ marginLeft: "0px" }}>
              <Menua href="/">TRANG CHỦ</Menua>
            </li>
            <li>
              <Menua href="/gioi-thieu">GIỚI THIỆU</Menua>
            </li>
            <li>
              <Menua href="/san-pham">SẢN PHẨM</Menua>
              <ul className="product-menu">
                <li className="left">
                  <ul>
                    {categories.map((category) => (
                      <li key={category}>
                        <LinkItems onClick={() => setToCategory(category)}>
                          {category}
                        </LinkItems>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <Menua href="/tin-tuc">TIN TỨC</Menua>
            </li>
            <li>
              <Menua href="/meo-hay">MẸO HAY</Menua>
            </li>
            <li>
              <Menua href="/lien-he" style={{ marginRight: "0px" }}>
                LIÊN HỆ
              </Menua>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

/* document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      document.querySelector(".header-wrapper").classList.add("fixed-top");
    } else {
      document.querySelector(".header-wrapper").classList.remove("fixed-top");
    }
  });
}); */

export default Header;
