import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import useMediaQuery from "@mui/material/useMediaQuery";
import { makeStyles } from "@mui/styles";
import React from "react";
import CartFormItem from "../../CartFormItem";
import "./giohang.scss";
import Category from "../../../category";
import MetaData from "../../MetaData";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemsToCart,
  removeItemsFromCart,
} from "../../../../actions/cartAction";
import formatString from "../../../../untils/formatString";

const useStyles = makeStyles({
  root: {
    paddingTop: "15px",
    paddingBottom: "15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  breadCrumbs: {
    textTransform: "uppercase",
    fontSize: "21px",
  },
  // cartFormTitle: {
  //     color: "#333",
  //     textTransform: "uppercase",
  //     fontSize: "12px",
  //     fontWeight: "700",
  //     borderBottom: "3px solid rgba(224, 224, 224, 1)",
  //     lineHeight: "1.5em",
  //     padding: "16px"
  // },
  tableHead: {
    fontSize: "12px !important",
  },
  shipCalculator: {
    color: "inherit",
    fontSize: "12px",
    transition: "0.2s all linear",
    textDecoration: "none",
    "&:hover": {
      color: "#51aa1b",
    },
  },
});

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

function GioHang() {
  const classes = useStyles();
  const matches = useMediaQuery("(min-width:600px)");

  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (newQty === 0) {
      dispatch(removeItemsFromCart(id));
      return;
    }
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const breadcrumbs = [
    <Link
      underline="none"
      key="1"
      href="/"
      onClick={handleClick}
      color="text.primary"
      className={classes.breadCrumbs}
    >
      Giỏ hàng
    </Link>,
    <Link
      underline="none"
      key="2"
      color="inherit"
      href="/thanh-toan"
      onClick={handleClick}
      className={classes.breadCrumbs}
    >
      Thanh toán
    </Link>,
    <Link
      underline="none"
      key="3"
      color="inherit"
      className={classes.breadCrumbs}
    >
      hoàn tất
    </Link>,
  ];
  return (
    <div className="cart">
      <Container>
        <MetaData title="Giỏ hàng" />
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
          className={classes.root}
        >
          {breadcrumbs}
        </Breadcrumbs>
        {cartItems.length === 0 ? (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p>Chưa có sản phẩm nào trong giỏ hàng</p>
            <Link
              to="/"
              className="btn--primary"
              style={{ margin: "10px auto" }}
            >
              Quay trở lại cửa hàng
            </Link>
          </div>
        ) : (
          <Grid container spacing={1.5}>
            <Grid
              item
              xs={12}
              md={7}
              className="cart-form"
              pr={1.5}
              sx={{
                borderRight: {
                  md: "1px solid #ccc",
                },
              }}
            >
              <TableContainer>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <th align="left">Sản phẩm</th>
                      <th align="left" className="cart-form-head">
                        Giá
                      </th>
                      <th align="left">Số lượng</th>
                      <th align="right" className="cart-form-head">
                        Tạm tính
                      </th>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cartItems &&
                      cartItems.map((item) => {
                        return (
                          <CartFormItem
                            key={item.product}
                            item={item}
                            increaseQuantity={increaseQuantity}
                            decreaseQuantity={decreaseQuantity}
                            deleteCartItems={deleteCartItems}
                          />
                        );
                      })}

                    <tr>
                      <td align="left">
                        <Link to="/san-pham" className="btn--outline">
                          ← Tiếp tục xem sản phẩm
                        </Link>
                      </td>
                    </tr>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={12} md={5}>
              <TableContainer>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <th align="left" style={{ minWidth: "150px" }}>
                        Cộng giỏ hàng
                      </th>
                      <th align="right"></th>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell className={classes.tableHead}>
                        Tạm tính
                      </TableCell>
                      <TableCell align="right">
                        <span className="cart-price">
                          {formatString(cartItems.reduce(
                            (acc, item) => acc + item.quantity * item.price,
                            0
                          ))} 
                        </span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.tableHead}>
                        Giao hàng
                      </TableCell>
                      <TableCell align="right">
                        <p className={classes.tableHead}>
                          {/* Nhập địa chỉ của bạn để xem các tùy chọn vận chuyển */}
                          <span className="cart-price">30,000 ₫</span>
                        </p>
                        {/* <a href="#" className={classes.shipCalculator}>
                      Tính phí giao hàng
                    </a> */}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.tableHead}>Tổng</TableCell>
                      <TableCell align="right">
                        <span className="cart-price">
                          {formatString(cartItems.reduce(
                            (acc, item) => acc + item.quantity * item.price,
                            0
                          ) + 30000)}
                          
                        </span>
                      </TableCell>
                    </TableRow>
                    <tr>
                      <td colSpan={2}>
                        <Link
                          to="/thanh-toan"
                          className="btn--primary"
                          style={{ marginTop: "10px" }}
                        >
                          Tiến hành thanh toán
                        </Link>
                      </td>
                    </tr>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        )}
      </Container>
    </div>
  );
}

export default GioHang;