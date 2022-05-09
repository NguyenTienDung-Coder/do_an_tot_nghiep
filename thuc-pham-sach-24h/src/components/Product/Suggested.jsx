import React, { useEffect } from "react";
import Carousel from "react-elastic-carousel";
import styled from "styled-components";
import Product from "./Product";
import { getAdminProduct, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader/Loader";
const Wrapper = styled.div`
  margin: 0 0.5rem;
  padding-bottom: 10px;
  position: relative;
  border: 1px solid #51aa1b;
  border-radius: 11px 11px 0 0;
  &:hover {
    border: 1px solid orange;
  }
`;
const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2, pagination: false },
  { width: 850, itemsToShow: 3 },
  { width: 1150, itemsToShow: 4, itemsToScroll: 2 },
  { width: 1450, itemsToShow: 5 },
  { width: 1750, itemsToShow: 6 },
];

export default function Suggested({ productProp, scrollToTop }) {
  // const { loading, error, products, productsCount } = useSelector(
  //   (state) => state.products
  // );
  const dispatch = useDispatch();
  const { products ,loading } = useSelector((state) => state.productsAdmin);



  useEffect(() => {
    dispatch(getAdminProduct());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Carousel breakPoints={breakPoints}>
          {products &&
            products
              .filter(
                (product) =>
                  product.category === productProp.category &&
                  product._id !== productProp._id
              )
              .map((product) => (
                <Wrapper key={product._id} onClick={scrollToTop}>
                  <Product product={product} />
                </Wrapper>
              ))}
        </Carousel>
      )}
    </>
  );
}
