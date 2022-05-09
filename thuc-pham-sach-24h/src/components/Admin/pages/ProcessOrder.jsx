import { Button, Container, Typography } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import {
  clearErrors,
  getOrderDetails,
  updateOrder,
} from "../../../actions/orderAction";
import { UPDATE_ORDER_RESET } from "../../../constants/orderConstants";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import MetaData from "../../Cart/MetaData";
import Sidebar from "../Sidebar";
import Loader from "../../Loader/Loader";
import formatString from "../../../untils/formatString";
import "../style/ProcessOrder.css";
import { style } from "@mui/system";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {},
  marg: {
    margin: "20px",
  },
  bol: {
    fontWeight: "bold",
  },
});

function ProcessOrder() {
  const classes = useStyles();
  const dispatch = useDispatch();
  let history = useHistory();
  let match = useParams();

  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = {
      status: status,
    };

    dispatch(updateOrder(match.id, myForm));
  };

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert("Cập nhập đơn hàng thành công");
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(match.id));
  }, [dispatch, error, match.id, isUpdated, updateError]);

  return (
    <Fragment>
      <MetaData title="Process Order" />

      <div className="dashboard">
        <Container
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              md: "row",
            },
            marginTop: "20px",
          }}
        >
          <Sidebar />
          <div className="newProductContainer">
            {loading ? (
              <Loader />
            ) : (
              <div
                className="confirmOrderPage"
                style={{
                  display: order.orderStatus === "Delivered" ? "block" : "grid",
                }}
              >
                <div>
                  <div className="confirmshippingArea">
                    <Typography className={classes.bol}>
                      Thông tin giao hàng
                    </Typography>
                    <div className={classes.marg}>
                      <div className="disFlex">
                        <p>Name:</p>
                        <span>{order.user && order.user.name}</span>
                      </div>
                      <div className="disFlex">
                        <p>Số điện thoại:</p>
                        <span>
                          {order.shippingInfo && order.shippingInfo.phoneNo}
                        </span>
                      </div>
                      <div className="disFlex">
                        <p>Địa chỉ:</p>
                        <span>
                          {order.shippingInfo &&
                            `${order.shippingInfo.address},${order.shippingInfo.country}, ${order.shippingInfo.state} , ${order.shippingInfo.city}`}
                        </span>
                      </div>
                    </div>

                    <Typography className={classes.bol}>
                      Thông tin thanh toán
                    </Typography>
                    <div className={classes.marg}>
                      <div>
                        <p
                          className={
                            order.paymentInfo &&
                            order.paymentInfo.status === "succeeded"
                              ? "greenColor"
                              : "redColor"
                          }
                        >
                          {order.paymentInfo && order.paymentInfo.status}
                        </p>
                      </div>

                      <div className="disFlex">
                        <p>Tổng tiền:</p>
                        <span>
                          {order.totalPrice && formatString(order.totalPrice)}
                        </span>
                      </div>
                    </div>

                    <Typography className={classes.bol}>
                      Trạng thái đặt hàng
                    </Typography>
                    <div className={classes.marg}>
                      <div>
                        <p
                          className={
                            order.orderStatus &&
                            order.orderStatus === "Delivered"
                              ? "greenColor"
                              : "redColor"
                          }
                        >
                          {order.orderStatus && order.orderStatus}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="confirmCartItems">
                    <Typography className={classes.bol}>Giỏ hàng:</Typography>
                    <div className="confirmCartItemsContainer">
                      {order.orderItems &&
                        order.orderItems.map((item) => (
                          <div
                            key={item.product}
                            style={{
                              display: "flex",
                              gap: "10px",
                              margin: "20px",
                            }}
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              style={{ width: "100px" }}
                            />
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>{" "}
                            <span>
                              {item.quantity} X {formatString(item.price)} ={" "}
                              <b>{formatString(item.price * item.quantity)}</b>
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
                {/*  */}
                <div
                  style={{
                    display:
                      order.orderStatus === "Delivered" ? "none" : "block",
                  }}
                >
                  <form
                    className="updateOrderForm"
                    onSubmit={updateOrderSubmitHandler}
                  >
                    <h1>Process Order</h1>

                    <div>
                      <AccountTreeIcon />
                      <select onChange={(e) => setStatus(e.target.value)}>
                        <option value="">Choose Category</option>
                        {order.orderStatus === "Processing" && (
                          <option value="Shipped">Shipped</option>
                        )}

                        {order.orderStatus === "Shipped" && (
                          <option value="Delivered">Delivered</option>
                        )}
                      </select>
                    </div>

                    <Button
                      id="createProductBtn"
                      type="submit"
                      disabled={
                        loading ? true : false || status === "" ? true : false
                      }
                    >
                      Process
                    </Button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </Container>
      </div>
    </Fragment>
  );
}

export default ProcessOrder;
