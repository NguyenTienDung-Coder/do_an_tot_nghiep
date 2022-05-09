import { Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { clearErrors, getOrderDetails } from "../../actions/orderAction";
import formatString from "../../untils/formatString";
import MetaData from "../Cart/MetaData";
import Loader from "../Loader/Loader";
import "./OrderDetails.css";

const OrderDetails = () => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);

  console.log(order);

  const dispatch = useDispatch();
  const match = useParams();

  console.log(match);

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(match.id));
  }, [dispatch, error, match.id]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Container>
          <MetaData title="Chi tiết đơn hàng" />
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography component="h2">
                Đơn hàng #{order && order._id}
              </Typography>
              <Typography>Thông tin ship hàng</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Họ và tên:</p>
                  <span>{order.user && order.user.name}</span>
                </div>
                <div>
                  <p>Số điện thoại:</p>
                  <span>
                    {order.shippingInfo && order.shippingInfo.phoneNo}
                  </span>
                </div>
                <div>
                  <p>Địa chỉ:</p>
                  <span>
                    {order.shippingInfo &&
                      `${order.shippingInfo.address}, ${order.shippingInfo.country}, ${order.shippingInfo.state}, ${order.shippingInfo.city}`}
                  </span>
                </div>
              </div>
              <Typography>Thông tin thanh toán</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.paymentInfo &&
                      order.paymentInfo.status === "Chuyển khoản ngân hàng"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    Phương thức thanh toán:<span> </span>
                    {order.paymentInfo && order.paymentInfo.status}
                  </p>
                </div>

                <div>
                  <p>Tổng đơn hàng:</p>
                  <span>
                    {order.totalPrice && formatString(order.totalPrice)}
                  </span>
                </div>
              </div>

              <Typography>Trạng thái đơn hàng</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.orderStatus && order.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.orderStatus && order.orderStatus}
                  </p>
                </div>
              </div>
            </div>

            <div className="orderDetailsCartItems">
              <Typography>Các sản phẩm trong giỏ hàng:</Typography>
              <div className="orderDetailsCartItemsContainer">
                {order.orderItems &&
                  order.orderItems.map((item) => (
                    <div key={item.product}>
                      <img src={item.image} alt={item.name} />
                      <Link to={`/product/${item.product}`}>
                        {item.name}
                      </Link>{" "}
                      <span>
                        {item.quantity} x {formatString(item.price)} ={" "}
                        <b>{formatString(item.price * item.quantity)}</b>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Container>
      )}
    </Fragment>
  );
};

export default OrderDetails;
