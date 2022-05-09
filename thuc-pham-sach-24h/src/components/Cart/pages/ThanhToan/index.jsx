import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Button, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { saveShippingInfo } from "../../../../actions/cartAction";
import { clearErrors, createOrder } from "../../../../actions/orderAction";
import useLocationForm from "../../../../hooks/useLocationForm";
import formatString from "../../../../untils/formatString";
import LocationForm from "../../LocationForm";
import MetaData from "../../MetaData";
import "./thanhtoan.scss";

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
});

function ThanhToan() {
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
      color="text.primary"
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

  //Handle shipping
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { error, isSubmit } = useSelector((state) => state.newOrder);

  const { state, onCitySelect, onDistrictSelect, onWardSelect, onSubmit } =
    useLocationForm(false);

  const {
    cityOptions,
    districtOptions,
    wardOptions,
    selectedCity,
    selectedDistrict,
    selectedWard,
  } = state;

  useEffect(() => {
    onCitySelect(shippingInfo.selectedCity);
  }, [cityOptions, shippingInfo.selectedCity]);

  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
  const [address, setAddress] = useState(shippingInfo.address);
  const [payment, setPayment] = useState("Chuyển khoản ngân hàng");
  const [comments, setComments] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, []);

  const handleChangePayment = (event) => {
    setPayment(event.target.value);
  };

  console.log(phoneNo, selectedCity, selectedDistrict, selectedWard, address);

  // Handle confirm
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const shippingCharges = 30000;

  const totalPrice = subtotal + shippingCharges;

  const shipInfo = {
    address: shippingInfo.address,
    phoneNo: shippingInfo.phoneNo,
    city: shippingInfo.selectedCity && shippingInfo.selectedCity.label,
    state: selectedDistrict && selectedDistrict.label,
    country: selectedWard && selectedWard.label,
  };

  const order = {
    shippingInfo: shipInfo,
    orderItems: cartItems,
    user: user && user._id,
    itemsPrice: subtotal,
    shippingPrice: shippingCharges,
    totalPrice: totalPrice,
    paymentInfo: {
      id: "abc",
      status: payment,
    },
    orderComments: comments,
  };

  const checkoutSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length < 9 || phoneNo.length > 9) {
      alert("Phone Number should be 9 digits Long");
      return;
    }
    console.log(order);

    sessionStorage.setItem("order", JSON.stringify(order));
    sessionStorage.setItem(
      "paidAt",
      JSON.stringify(new Date().toLocaleDateString("en-GB"))
    );
    dispatch(
      saveShippingInfo({
        address,
        selectedCity,
        selectedDistrict,
        selectedWard,
        phoneNo,
      })
    );

    dispatch(createOrder(order));
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    if (isSubmit) {
      history.push("/hoan-tat");
    }
  }, [dispatch, error, alert]);

  return (
    <Container>
      <MetaData title="Thanh toán" />
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        className={classes.root}
      >
        {breadcrumbs}
      </Breadcrumbs>
      {/* <p className="login-toggle">
        Bạn đã có tài khoản?{" "}
        <a href="/login" className={classes.showLogin}>
          Ấn vào đây để đăng nhập
        </a>
      </p> */}
      <form encType="multipart/form-data" onSubmit={checkoutSubmit}>
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            md={7}
            className="cart-form"
            sx={{
              paddingRight: {
                md: "20px",
              },
            }}
          >
            <Divider sx={{ marginBottom: "8px", border: "1px solid #ccc" }} />
            <Typography variant="h3" fontSize="14.63px" fontWeight="700">
              THANH TOÁN VÀ GIAO HÀNG
            </Typography>
            <p className={classes.formRow}>
              <label htmlFor="billing_last_name" className={classes.labelForm}>
                Họ và tên *
              </label>
              <input
                placeholder="Họ và tên của bạn"
                name="billing_last_name"
                id="billing_last_name"
                className={classes.inputForm}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </p>
            <Grid container spacing={{ xs: 0, sm: 3 }}>
              <Grid item xs={12} sm={6}>
                <p className={classes.formRow}>
                  <label htmlFor="billing_phone" className={classes.labelForm}>
                    Số điện thoại *
                  </label>
                  <input
                    placeholder="Số điện thoại"
                    name="billing_phone"
                    id="billing_phone"
                    required
                    className={classes.inputForm}
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                  />
                </p>
              </Grid>
              <Grid item xs={12} sm={6}>
                <p className={classes.formRow}>
                  <label htmlFor="billing_email" className={classes.labelForm}>
                    Địa chỉ email *
                  </label>
                  <input
                    placeholder="Địa chỉ email"
                    name="billing_email"
                    id="billing_email"
                    className={classes.inputForm}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled
                  />
                </p>
              </Grid>
            </Grid>
            <LocationForm
              cityOptions={cityOptions}
              onCitySelect={onCitySelect}
              onDistrictSelect={onDistrictSelect}
              onWardSelect={onWardSelect}
              onSubmit={onSubmit}
              districtOptions={districtOptions}
              wardOptions={wardOptions}
              selectedCity={selectedCity}
              selectedDistrict={selectedDistrict}
              selectedWard={selectedWard}
            />
            <label htmlFor="billing_address" className={classes.labelForm}>
              Địa chỉ *
            </label>
            <input
              placeholder="Địa chỉ"
              name="billing_address"
              id="billing_address"
              className={classes.inputForm}
              style={{ width: "100%" }}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <p style={{ display: "flex", alignItems: "center" }}>
              {/* <input type="checkbox" name="createaccount" id="createaccount" />
              <label htmlFor="createaccount" className={classes.message}>
                Tạo tài khoản mới?
              </label> */}
            </p>
            <div>
              <Typography variant="h3" fontSize="14.63px" fontWeight="700">
                THÔNG TIN BỔ SUNG
              </Typography>
              <p className={classes.formRow}>
                <label htmlFor="order_comments" className={classes.labelForm}>
                  Ghi chú đơn hàng (tuỳ chọn)
                </label>
                <textarea
                  name="order_comments"
                  id="order_comments"
                  cols={5}
                  rows={7}
                  placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn."
                  className={classes.textareaForm}
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                ></textarea>
              </p>
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            md={5}
            className={classes.borderForm}
            sx={{
              marginLeft: {
                xs: "24px",
                md: "0",
              },
              marginTop: {
                xs: "10px",
                md: "0",
              },
            }}
          >
            <Typography variant="h3" fontSize="14.63px" fontWeight="700">
              ĐƠN HÀNG CỦA BẠN
            </Typography>
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <th align="left" className={classes.cartFormTitle}>
                      Sản phẩm
                    </th>
                    <th align="right" className={classes.cartFormTitle}>
                      Tạm tính
                    </th>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems &&
                    cartItems.map((item) => (
                      <tr className={classes.tableRow}>
                        <td
                          align="left"
                          className={classes.tableHead}
                          style={{ width: "50%" }}
                        >
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
                    ))}
                  <tr className={classes.tableRow}>
                    <td
                      className={classes.tableHead}
                      style={{ fontWeight: "700" }}
                    >
                      Tạm tính
                    </td>
                    <td align="right">
                      <span className="cart-price">
                        {formatString(subtotal)}
                      </span>
                    </td>
                  </tr>
                  <tr className={classes.tableRow}>
                    <td
                      className={classes.tableHead}
                      style={{ fontWeight: "700" }}
                    >
                      Giao hàng
                    </td>
                    <td align="right">
                      <span className="cart-price">
                        {formatString(shippingCharges)}
                      </span>
                    </td>
                  </tr>
                  <tr className={classes.tableRow}>
                    <td
                      className={classes.tableHead}
                      style={{ fontWeight: "700" }}
                    >
                      Tổng
                    </td>
                    <td align="right">
                      <span className="cart-price">
                        {formatString(totalPrice)}
                      </span>
                    </td>
                  </tr>

                  {/* O giua */}
                  <tr>
                    <td colSpan={2}>
                      <RadioGroup
                        name="controlled-radio-buttons-group"
                        value={payment}
                        onChange={handleChangePayment}
                      >
                        <FormControlLabel
                          value="Chuyển khoản ngân hàng"
                          control={<Radio />}
                          label="Chuyển khoản ngân hàng"
                          className={classes.labelForm}
                          size="small"
                        />
                        <Typography
                          variant="caption"
                          display="block"
                          gutterBottom
                        >
                          Vui lòng sử dụng Mã đơn hàng của bạn trong phần Nội
                          dung thanh toán.
                        </Typography>
                        <p className={classes.labelForm}>
                          Thông tin chuyển khoản
                        </p>
                        <p className={classes.labelForm}>
                          Số Tài khoản : 370376868
                        </p>
                        <p className={classes.labelForm}>
                          Ngân hàng : NH TMCP Á Châu ( ACB)
                        </p>
                        <p className={classes.labelForm}>
                          Chủ tài khoản: Võ Chí Dũng
                        </p>
                        <FormControlLabel
                          value="Trả tiền mặt khi nhận hàng"
                          control={<Radio />}
                          label="Trả tiền mặt khi nhận hàng"
                        />
                      </RadioGroup>
                    </td>
                  </tr>
                  {/* tr2 */}
                  <tr>
                    <td colSpan={2}>
                      {/* <a
                        href="/hoant-tat"
                        className="btn--primary"
                        style={{ marginTop: "10px" }}
                      > */}
                      <Button
                        type="submit"
                        variant="contained"
                        color="success"
                        sx={{
                          mt: 2,
                        }}
                      >
                        Đặt hàng
                      </Button>
                      {/* </a> */}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <p className={classes.labelForm}>
                        Các thông tin điền vào đơn hàng chỉ phục vụ cho việc bán
                        hàng, giao hàng. Chúng tôi đảm mật hoàn toàn thông tin
                        cá nhân của khách hàng.
                      </p>
                    </td>
                  </tr>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default ThanhToan;
