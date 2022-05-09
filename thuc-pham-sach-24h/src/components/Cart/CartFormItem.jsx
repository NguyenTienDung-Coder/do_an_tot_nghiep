import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Divider from "@mui/material/Divider";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import React from "react";
import "./styles/drawer.scss";
import GroupedButtons from "./GroupedButtons";
import { Link } from "react-router-dom";
import formatString from "../../untils/formatString";

function CartFormItem({
  item,
  increaseQuantity,
  decreaseQuantity,
  deleteCartItems,
}) {
  return (
    <>
      <TableRow>
        <TableCell sx={{ display: "flex", alignItems: "center" }}>
          <p
            onClick={() => deleteCartItems(item.product)}
            className="cart-item-remove"
            style={{
              cursor: "pointer",
            }}
          >
            <CloseRoundedIcon
              sx={{ mr: 1 }}
              fontSize="small"
            ></CloseRoundedIcon>
          </p>
          <Link
            to={`/product/${item.product}`}
            className="cart-image cart-form-image"
          >
            <img src={item.image} alt={item.name} />
          </Link>
          <div>
            <Link to={`/product/${item.product}`} className="cart-item-name">
              {item.name}
            </Link>
            <Typography
              variant="caption"
              className="cart-price"
              sx={{
                display: {
                  md: "none",
                },
              }}
            >
              1 x {item.price} ₫
            </Typography>
          </div>
        </TableCell>
        <TableCell align="left" className="cart-form-data">
          <span className="cart-price">{formatString(item.price)}</span>
        </TableCell>
        <TableCell align="left">
          <GroupedButtons
            item={item}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
          />
        </TableCell>
        <TableCell align="right" className="cart-form-data">
          <span className="cart-price">{formatString(item.price * item.quantity)}</span>
        </TableCell>
      </TableRow>
      <Divider />
    </>
  );
}

export default CartFormItem;
