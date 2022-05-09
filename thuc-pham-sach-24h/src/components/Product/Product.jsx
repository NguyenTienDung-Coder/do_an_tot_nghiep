import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";

import "./Hover2.scss";
import { useDispatch, useSelector } from "react-redux";
import { addItemsToCart } from "../../actions/cartAction";
import formatString from "../../untils/formatString";

const LinkItems = styled(Link)`
  &&& {
    color: black;
    text-decoration: none;
    &:hover {
      color: #51aa1b;
    }
  }
`;
const ListTitle = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProductIMG = styled.img`
  width: 100%;
  border-radius: 9px 9px 0 0;
  /* @media screen and (max-width: 3000px) {
      min-height: 284px;
    }
  @media screen and (max-width: 1200px) {
      min-height: 250px;
    }
  @media screen and (max-width: 900px) {
      min-height: 250px;
    }
  @media screen and (max-width: 600px) {
      min-height: 150px;
    } */
  @media only screen and (max-width: 600px) {
    height: 180px;
  }

  /* Small devices (portrait tablets and large phones, 600px and up) */
  @media only screen and (min-width: 600px) {
    height: 284px;
  }

  /* Medium devices (landscape tablets, 768px and up) */
  @media only screen and (min-width: 768px) {
    height: 284px;
  }

  /* Large devices (laptops/desktops, 992px and up) */
  @media only screen and (min-width: 992px) {
    height: 230px;
  }

  /* Extra large devices (large laptops and desktops, 1200px and up) */
  @media only screen and (min-width: 1200px) {
    height: 284px;
  }
`;

const DiscountStyled = styled.span`
  position: absolute;
  background-color: rgb(231, 93, 88);
  font-weight: bold;
  color: white;
  border-radius: 5px;
  top: 5%;
  left: 5%;
  padding: 5px;
  max-width: 50px;
`;

const ButtonStyled = styled(Button)`
  &&& {
    background: linear-gradient(to right, white 50%, #51aa1b 50%);
    background-size: 200% 100%;
    background-position: right bottom;
    transition: all 0.4s ease-in;
    max-height: 37px;
    &:hover {
      background-position: left bottom;
      color: #51aa1b;
      /* border: 1px solid #51AA1B; */
    }
    @media screen and (max-width: 1124px) {
      font-size: 11px;
    }
    @media screen and (max-width: 900px) {
      font-size: 14px;
    }
    @media screen and (max-width: 450px) {
      font-size: 11px;
    }
  }
`;

const OrderWrapper = styled(ListTitle)`
  padding: 0 5px;
  margin-top: 20px;
  @media screen and (max-width: 768px) {
    display: block;
  }
`;
const ProductName = styled.div`
  font-size: 14px;
  font-weight: 500;
  text-transform: none !important;
  white-space: nowrap;  
  overflow: hidden;
  text-overflow: ellipsis; 
`;
const QuantityStyled = styled.div`
  border: 1px solid #51aa1b;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  line-height: 30px;
  padding: 0 0.5rem;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    margin-bottom: 0.5rem;
  }
`;
const SoldOutStyled = styled.div`
  position: absolute;
  top: 30%;
  height: 15%;
  background-color: white;
  width: 100%;
  opacity: 0.7;
`;
const Pe = styled.p`
  font-weight: bolder;
  color: black !important;
`;
const Wrapper = styled.div``;

export default function Product({ product }) {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  //Cart
  const { cartItems } = useSelector((state) => state.cart);

  const handleIncrement = () => {
    if (product.Stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };
  const handleDecrement = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(product._id, quantity));
    alert("Thêm vào giỏ hàng thành công");
  };

  return (
    <Wrapper>
      {product.Stock > 0 ? (
        <>
          <LinkItems to={`/product/${product._id}`}>
            <div>
              <div className="shine">
                {/* <Box sx={
                  {
                    minHeight:{
                      lg:"327px",
                      md: "250px",
                      sm: "150px",
                      xs: "100px"
                    }
                  }
                }> */}
                <ProductIMG src={product.images[0].url} alt={product.name} />
                {/* </Box> */}
              </div>
            </div>
            <ProductName>{product.name}</ProductName>
          </LinkItems>

          <p>
            <span
              style={{
                fontWeight: "500",
                color: "#51AA1B",
                textTransform: "lowercase",
              }}
            >
              {" "}
              {`${formatString(product.price)}/${product.unitPrice}`}
            </span>
          </p>

          <OrderWrapper>
            <QuantityStyled>
              <span onClick={handleDecrement}>-</span>
              <input
                style={{ width: "30px", border: "none", textAlign: "center" }}
                type="text"
                value={quantity}
                readOnly={true}
              />
              <span onClick={handleIncrement}>+</span>
            </QuantityStyled>
            <ButtonStyled variant="contained" onClick={addToCartHandler}>
              Thêm vào giỏ hàng
            </ButtonStyled>
          </OrderWrapper>
        </>
      ) : (
        <>
          <LinkItems to={`/product/${product._id}`}>
            <div>
              <div className="shine">
                <ProductIMG src={product.images[0].url} alt={product.name} />
              </div>
            </div>
            <ProductName>{product.name}</ProductName>
          </LinkItems>
          <p>
            <span style={{ fontWeight: "500", color: "#51AA1B" }}>
              {" "}
              {`${formatString(product.price)}/${product.unitPrice}`}
            </span>
          </p>
          <SoldOutStyled>
            <Pe>HẾT HÀNG</Pe>
          </SoldOutStyled>
          <OrderWrapper>

            <ButtonStyled component={Link} to={`/product/${product._id}`} style={{ width: "100%" }} variant="contained">
              Đọc tiếp
            </ButtonStyled>
          </OrderWrapper>
        </>
      )}
    </Wrapper>
  );
}
