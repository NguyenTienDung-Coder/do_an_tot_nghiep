import styled from "styled-components";
import {
  Container,
  FormControl,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Select,
} from "@mui/material";
import { Fragment, React, useEffect, useState } from "react";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import CloseIcon from "@mui/icons-material/Close";
import Product from "./Product";
import "./Hover2.scss";
import "./Product.css";
import { useParams } from "react-router-dom";
import Category from "../category";
import { getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader/Loader";
import Pagination from "react-js-pagination";
import MetaData from "../Cart/MetaData";
import Search from "@mui/icons-material/Search";

const categories = ["Hải sản", "Cá", "Mắm", "Thịt"];

const LinkTitle = styled.div`
  text-align: left;
  font-size: 14px;
  margin-top: 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid #f5f5f5;
`;
const ContentWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  margin-bottom: 2rem;
`;
const CategoryStyle = styled.div`
  text-align: left;
  z-index: 100;
  display: block;
  max-width: 235px;
  @media screen and (max-width: 768px) {
    left: ${({ close }) => (close ? "0" : "-100%")};
    position: absolute;
    transition: 0.6s;
    background-color: #ffffff;
    padding: 0 20px;
  }
`;
const LinkItems = styled(Link)`
  &&& {
    color: black;
    text-decoration: none;
    cursor: pointer;
    &:hover {
      color: #51aa1b;
    }
  }
`;
const LI = styled.li`
  list-style: none;
  padding: 10px 0 5px 0;
  border-bottom: 1px solid #e6e6fa;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
`;
const CurrentQuantity = styled.span`
  font-size: 10px;
`;

const ListTitle = styled.div`
  display: flex;
  justify-content: space-between;
`;
const SelectBox = styled.div`
  min-width: 200px;
`;
const ProductWrapper = styled.div`
  padding-bottom: 5px;
  position: relative;
  border: 1px solid #51aa1b;
  border-radius: 9px;
  width: 100%;

  text-align: center;
  &:hover {
    border: 1px solid orange;
  }
`;

const ProductContainer = styled.div`
  display: block;
  width: 100%;
  margin-left: 20px;
  opacity: ${({ close }) => (close ? "0.5" : "1")};
  transition: opacity 0.6s;
`;
const MenuIconOpen = styled(Link)`
  justify-content: start;
  color: black !important;
  display: none;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    display: flex;
  } ;
`;
const MenuIconClose = styled(Link)`
  display: none;
  justify-content: end;
  font-size: 1.5rem;
  margin-top: 0.75rem;
  margin-right: 1rem;
  color: black !important;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    display: flex;
  } ;
`;
const PaginationBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 6vmax;
`;
export default function ProductCate({ match }) {
  const [close, setClose] = useState(false);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const showSidebar = () => {
    setClose(!close);
    console.log(close);
  };

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const data = useSelector((state) => state.products);
  const keyword = match && match.params.keyword;

  const dispatch = useDispatch();

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    dispatch(getProduct(currentPage, category, sort, keyword));
  }, [dispatch, currentPage, category, sort, keyword]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Sản phẩm" />
          <Container maxWidth="lg">
            <Category name="Sản phẩm" />
            {/* 
        <LinkTitle>
          <Link href="#" underline="none" color="#51AA1B">
            Trang chủ
          </Link>{" "}
          /
          <Link href="#" underline="none" color="black">
            {" "}
            Sản Phẩm
          </Link>
        </LinkTitle> */}
            <ContentWrapper>
              {/* <Grid container spacing={2}>
                    <Grid item xs={3}> */}
              <CategoryStyle close={close}>
                <MenuIconClose onClick={showSidebar}>
                  <CloseIcon fontSize="large" />
                </MenuIconClose>
                <h5>DANH MỤC SẢN PHẨM</h5>
                <ul style={{ padding: 0 }}>
                  {categories.map((category) => (
                    <LI key={category}>
                      <LinkItems onClick={() => setCategory(category)}>
                        {category}
                      </LinkItems>
                    </LI>
                  ))}
                </ul>
                <div className="shine">
                  <img
                    src={require("./IMG/blog-banner.jpg")}
                    style={{ width: "100%" }}
                    width="280px"
                    alt="a"
                  />
                </div>
              </CategoryStyle>
              {/* </Grid>
                    <Grid item xs={9}> */}
              <ProductContainer close={close}>
                <ListTitle>
                  <h2>
                    {
                      category?(category.toUpperCase()):("CỬA HÀNG")
                    }
                    <span>
                      <MenuIconOpen onClick={showSidebar}>
                        <FormatListBulletedIcon fontSize="large" />
                      </MenuIconOpen>
                    </span>
                  </h2>

                  <SelectBox>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Thứ tự
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        // label="Thứ tự mặc định"
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                      >
                        <MenuItem value="">Mới nhất</MenuItem>
                        <MenuItem value="sort=oldest">Cũ nhất</MenuItem>
                        <MenuItem value="sort=price">Price: Low-High</MenuItem>
                        <MenuItem value="sort=-price">Price: High-Low</MenuItem>
                      </Select>
                    </FormControl>
                  </SelectBox>
                </ListTitle>

                <Grid
                  container
                  spacing={{ xs: 2, md: 3 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                >
                  {products &&
                    products.map((product) => (
                      <Grid item xs={2} sm={4} md={4} key={product._id}>
                        <ProductWrapper>
                          <Product product={product} />
                        </ProductWrapper>
                      </Grid>
                    ))}
                </Grid>
                {/* </Grid>
                </Grid> */}
                {resultPerPage < filteredProductsCount && (
                  <PaginationBox>
                    <Pagination
                      activePage={currentPage}
                      itemsCountPerPage={resultPerPage}
                      totalItemsCount={productsCount}
                      onChange={setCurrentPageNo}
                      nextPageText="Next"
                      prevPageText="Prev"
                      firstPageText="First"
                      lastPageText="Last"
                      itemClass="page-item"
                      linkClass="page-link"
                      activeClass="pageItemActive"
                      activeLinkClass="pageLinkActive"
                    />
                  </PaginationBox>
                )}
              </ProductContainer>
            </ContentWrapper>
          </Container>
        </Fragment>
      )}
    </Fragment>
  );
}
