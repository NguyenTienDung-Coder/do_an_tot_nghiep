import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Breadcrumbs, Container } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import formatString from "../../../../untils/formatString";
import MetaData from "../../MetaData";
import "./hoantat.scss";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

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
  borderForm: {
    border: "2px solid #51aa1b",
    padding: "15px 30px",
    height: "fit-content",
  },
  cartFormTitle: {
    color: "#333",
    textTransform: "uppercase",
    fontSize: "12px",
    fontWeight: "700",
    borderBottom: "3px solid rgba(224, 224, 224, 1)",
    lineHeight: "1.5em",
    padding: "16px",
  },
  tableHead: {
    fontSize: "12px !important",
    lineHeight: "3",
  },
  message: {
    color: "#333",
    fontSize: "13.3px",
  },
  showLogin: {
    transition: "0.2s all linear",
    textDecoration: "none",
    color: "inherit",
    "&:hover": {
      color: "#51aa1b",
    },
  },
  formRow: {
    display: "flex",
    flexDirection: "column",
    margin: "10px 0",
  },
  labelForm: {
    color: "#222",
    fontSize: "12px",
    fontWeight: "700",
    lineHeight: "1.4",
  },
  inputForm: {
    padding: "0 0.75em",
    height: "2.5em",
    color: "#333",
    border: "1px solid #ddd",
    outline: "none",
    fontSize: "13px",
    marginTop: "3px",
    // fontSize: "0.97em"
  },
  textareaForm: {
    padding: "10px",
    outline: "none",
    marginTop: "3px",
  },
  tableTitle: {
    fontWeight: "700 !important",
  },
  tableRow: {
    borderBottom: "1px solid #ddd",
  },
  thankyou: {
    color: "#f9c938",
    fontSize: "13px",
    fontWeight: "700",
    lineHeight: "18px",
  },
});

function HoanTat() {
  const classes = useStyles();
  const breadcrumbs = [
    <Link
      underline="none"
      key="1"
      href="/"
      color="inherit"
      onClick={handleClick}
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
      color="text.primary"
      className={classes.breadCrumbs}
    >
      hoàn tất
    </Link>,
  ];

  const [orderItems, setOrderItems] = useState([]);
  const [itemsPrice, setItemsPrice] = useState(0);
  const [shippingPrice, setShippingPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentInfo, setPaymentInfo] = useState("");
  const [paidAt, setPaidAt] = useState("");

  useEffect(() => {
    const order = JSON.parse(sessionStorage.getItem("order"));
    const paidAt = JSON.parse(sessionStorage.getItem("paidAt"));
    setOrderItems(order.orderItems);
    setItemsPrice(order.itemsPrice);
    setShippingPrice(order.shippingPrice);
    setTotalPrice(order.totalPrice);
    setPaymentInfo(order.paymentInfo.status);
    setPaidAt(paidAt);
  }, []);

  return (
    <Container sx={{ marginBottom: "20px" }}>
      <MetaData title="Hoàn tất thanh toán" />
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        className={classes.root}
      >
        {breadcrumbs}
      </Breadcrumbs>
      <p className={classes.message}>{paymentInfo}</p>
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          md={7}
          className="cart-form"
          sx={{ paddingRight: "20px" }}
        >
          <Typography variant="h2" fontSize="21.28px" fontWeight="600">
            Chi tiết đơn hàng
          </Typography>
          <TableContainer>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <th align="left" className={classes.cartFormTitle}>
                    Sản phẩm
                  </th>
                  <th align="right" className={classes.cartFormTitle}>
                    Tổng
                  </th>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderItems &&
                  orderItems.map((item) => {
                    return (
                      <tr className={classes.tableRow} key={item._id}>
                        <td align="left" className={classes.tableHead}>
                          <span>
                            {item.name} × {item.quantity}
                          </span>
                        </td>
                        <td align="right">
                          <span className="cart-price">
                            {formatString(item.price * item.quantity)}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                <tr className={classes.tableRow}>
                  <td
                    className={classes.tableHead}
                    style={{ fontWeight: "700" }}
                  >
                    Tạm tính:
                  </td>
                  <td align="right">
                    <span className="cart-price">
                      {formatString(itemsPrice)}
                    </span>
                  </td>
                </tr>
                <tr className={classes.tableRow}>
                  <td
                    className={classes.tableHead}
                    style={{ fontWeight: "700" }}
                  >
                    Giao nhận hàng:
                  </td>
                  <td align="right">
                    <span className="cart-price">
                      {formatString(shippingPrice)}
                    </span>
                  </td>
                </tr>
                <tr className={classes.tableRow}>
                  <td
                    className={classes.tableHead}
                    style={{ fontWeight: "700" }}
                  >
                    Phương thức thanh toán:
                  </td>
                  <td align="right">
                    <span className={classes.message}>{paymentInfo}</span>
                  </td>
                </tr>
                <tr className={classes.tableRow}>
                  <td
                    className={classes.tableHead}
                    style={{ fontWeight: "700" }}
                  >
                    Tổng cộng:
                  </td>
                  <td align="right">
                    <span className="cart-price">
                      {formatString(totalPrice)}
                    </span>
                  </td>
                </tr>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} md={5}>
          <Box>
            <Paper
              sx={{
                padding: {
                  xs: "10px 20px",
                  md: "20px 30px",
                },
                marginTop: {
                  xs: "20px",
                },
                backgroundColor: "rgba(0,0,0,0.02)",
              }}
            >
              <p className={classes.thankyou}>
                Cảm ơn bạn. Đơn hàng của bạn đã được nhận.
              </p>
              <ul>
                {/* <li className="order-overview">
                  Mã đơn hàng: <strong>4759</strong>{" "}
                </li> */}
                <li className="order-overview">
                  Ngày: <strong>{paidAt}</strong>
                </li>
                <li className="order-overview">
                  Tổng cộng:{" "}
                  <span className="cart-price">{formatString(totalPrice)}</span>
                </li>
                <li className="order-overview">
                  Phương thức thanh toán: <strong>{paymentInfo}</strong>
                </li>
              </ul>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default HoanTat;
