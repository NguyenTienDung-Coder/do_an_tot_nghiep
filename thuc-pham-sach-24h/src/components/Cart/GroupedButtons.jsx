import ButtonGroup from "@mui/material/ButtonGroup";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles({
  root: {
    backgroundColor: "red",
  },
  btnMinus: {
    border: "1px solid #ccc",
    minWidth: "8px",
    borderRight: "0",
    backgroundColor: "transparent",
    cursor: "pointer",
    transition: "0.2s all linear",
    "&:hover": {
      backgroundColor: "#eee",
    },
  },
  btnPlus: {
    border: "1px solid #ccc",
    borderLeft: "0",
    minWidth: "8px",
    backgroundColor: "transparent",
    cursor: "pointer",
    transition: "0.2s all linear",
    "&:hover": {
      backgroundColor: "#eee",
    },
  },
  quantity: {
    maxWidth: "2rem",
    textAlign: "center",
    outline: "none",
    border: "1px solid #ccc",
    borderLeft: "none",
    borderRight: "none",
    height: "30px",
  },
});

function GroupedButtons({ item, increaseQuantity, decreaseQuantity }) {
  const classes = useStyles();

  return (
    <ButtonGroup size="medium">
      <button
        onClick={() => decreaseQuantity(item.product, item.quantity)}
        className={classes.btnMinus}
      >
        -
      </button>
      <input value={item.quantity} className={classes.quantity} />
      <button
        onClick={() =>
          increaseQuantity(item.product, item.quantity, item.stock)
        }
        className={classes.btnPlus}
      >
        +
      </button>
    </ButtonGroup>
  );
}

export default GroupedButtons;
