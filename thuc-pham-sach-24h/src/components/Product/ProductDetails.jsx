import { Box, Button, Container, Grid, Link, Rating } from "@mui/material";
import ProductContent from "./ProductContent";
import ProductReview from "./ProductReview";
import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";
import PinterestIcon from "@mui/icons-material/Pinterest";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Tab from "@mui/material/Tab";
import Blog from "./Blog";
import Suggested from "./Suggested";
import "./Hover2.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../actions/productAction";
import Category from "../category";
import Loader from "../Loader/Loader";
import ListReview from "./ListReview";
import { addItemsToCart } from "../../actions/cartAction";
import MetaData from "../Cart/MetaData";
import formatString from "../../untils/formatString";
import {
  DialogActions,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { NEW_REVIEW_RESET } from "../../constants/productConstant";

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
  margin-top: 2rem;
  border-bottom: 1px solid #f5f5f5;
`;
const GridStyled = styled(Grid)`
  @media screen and (max-width: 900px) {
    display: none;
  } ;
`;

const ProductIMG = styled.img`
  width: 100%;
`;
const SocialLink = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: start;
`;
const IconLink = styled(Link)`
  padding-right: 0.5rem;
`;
const Detail = styled.div`
  text-align: left;
  padding: 5px 0;
  font-size: 12px;
  border-top: 1.5px dotted #dddddd;
`;
const PrdDetail = styled.div`
  text-align: left;
`;
const HideIcon = styled(IconLink)`
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
  } ;
`;
const Price = styled.div`
  display: flex;
`;

const OriginPrice = styled.div`
  font-size: 15px;
  text-decoration: line-through #51aa1b;
  line-height: 32px;
`;
const CurrentPrice = styled.div`
  font-size: 24px;
  color: #51aa1b;
  margin-left: 0.5rem;
`;
const MoreInfo = styled.div`
  border: 1px solid #51aa1b;
  border-radius: 11px;
  margin-top: 5px;
`;
const TitleMoreInfo = styled.div`
  background-color: #51aa1b;
  border-radius: 10px 10px 0 0;
  color: white;
  padding: 10px 0 10px 10px;
  font-size: 14px;
  font-weight: lighter;
`;
const LiStyled = styled.li`
  margin: 10px 0 0 -10px;
  font-size: 13px;
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
  width: 70px;
  margin-left: 5px;
`;
const QtyWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
`;
const ButtonStyled = styled(Button)`
  &&& {
    margin-top: 1rem;
    display: inline-block;
    background: linear-gradient(to right, white 50%, #51aa1b 50%);
    background-size: 200% 100%;
    background-position: right bottom;
    transition: all 0.4s ease-in;
    width: 100%;
    &:hover {
      background-position: left bottom;
      color: #51aa1b;
    }
  }
`;
const HotLineStyled = styled.div`
  border: 1px solid #51aa1b;
  border-radius: 11px;
  width: 100%;
  padding: 10px;
  text-align: center;
`;
const HotlineNum = styled.a`
  color: #ec7523;
  font-size: 30px;
  text-decoration: none;
`;
const SuggestedWrapper = styled.div`
  margin-bottom: 2rem;
  text-align: center;
`;

const ProductDetails = ({ match }) => {
  const [quantity, setQuantity] = useState(1);
  const [value, setValue] = useState("1");
  const [productStatus, setProductStatus] = useState("");
  const [disableButton, setDisableButton] = useState();
  const [buttonText, setButtonText] = useState("");
  const [buttonSubText, setButtonSubText] = useState("");
  const [checkQuantity, setCheckQuantity] = useState();
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { isAuthenticated } = useSelector((state) => state.user);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const dispatch = useDispatch();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );
  useEffect(() => {
    if (reviewError) {
      alert(reviewError);
      dispatch(clearErrors());
    }
    if (success) {
      alert("Review Submited Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(match.params.id));
  }, [dispatch, match.params.id, reviewError, success]);

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
    dispatch(addItemsToCart(match.params.id, quantity));
    alert("Item Added To Cart");
  };

  const CheckStatus = () => {
    if (product.Stock > 0) {
      setProductStatus("C??n h??ng");
      setDisableButton(false);
      setButtonText(
        `Mua ngay v???i gi?? ${product.price && formatString(product.price)}`
      );
      setButtonSubText("?????t mua giao h??ng t???n n??i");
      setCheckQuantity(false);
    } else {
      setProductStatus("H???t h??ng");
      setDisableButton(true);
      setButtonText(`H???t h??ng`);
      setButtonSubText("");
      setCheckQuantity(true);
    }
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = {
      rating,
      comment,
      productId: match.params.id,
    };
    // myForm.set("rating",rating);
    // myForm.set("comment",comment);
    // myForm.set("productId",match.params.id);
    dispatch(newReview(myForm));
    setOpen(false);
  };
  useEffect(() => {
    CheckStatus();
  });

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Container maxWidth="lg">
          <MetaData title={product.name} />
          {/* <LinkTitle>
          <Link href="#" underline="none" color="#51AA1B">
            Trang ch???
          </Link>{" "}
          /
          <Link href="#" underline="none" color="#51AA1B">
            {" "}
            S???n Ph???m
          </Link>{" "}
          /
          <Link href="#" underline="none" color="#51AA1B">
            {" "}
            Category_id
          </Link>
        </LinkTitle> */}
          <Category name={product.name} />
          <ContentWrapper>
            <Grid container spacing={2} columns={{ xs: 12, sm: 12, md: 12 }}>
              <Grid item md={9} sm={12} xs={12}>
                <Grid
                  container
                  spacing={2}
                  columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}
                >
                  <Grid item xs={12} sm={7} md={7} lg={7}>
                    <div className="shine">
                      {product.images &&
                        product.images.map((item, i) => (
                          <ProductIMG key={i} src={item.url} alt="name" />
                        ))}
                    </div>

                    <SocialLink>
                      <HideIcon
                        href="#"
                        title="Share on Whatapps"
                        style={{ color: "#51AA1B" }}
                      >
                        <WhatsAppIcon />
                      </HideIcon>
                      <IconLink
                        href="#"
                        title="Share on Facebook"
                        style={{ color: "#3A589D" }}
                      >
                        <FacebookIcon />
                      </IconLink>
                      <IconLink
                        href="#"
                        title="Share on Twitter"
                        style={{ color: "#2478BA" }}
                      >
                        <TwitterIcon />
                      </IconLink>
                      <IconLink
                        href="#"
                        title="Email to a Friend"
                        style={{ color: "#111111" }}
                      >
                        <EmailIcon />
                      </IconLink>
                      <IconLink
                        href="#"
                        title="Pin on Pinterest"
                        style={{ color: "#CB2320" }}
                      >
                        <PinterestIcon />
                      </IconLink>
                      <IconLink
                        href="#"
                        title="Share on Linkedln"
                        style={{ color: "#0072B7" }}
                      >
                        <LinkedInIcon />
                      </IconLink>
                    </SocialLink>
                    <Detail>M??: {product._id}</Detail>
                    <Detail>Danh m???c: {product.category}</Detail>
                    <Detail>T??? kho??: ...</Detail>
                  </Grid>
                  <Grid item xs={12} sm={5} md={5} lg={5}>
                    <PrdDetail>
                      <div style={{ fontSize: "24px" }}>{product.name}</div>
                      <Price>
                        <OriginPrice>Gi?? g???c</OriginPrice>
                        <CurrentPrice>
                          {product.price && formatString(product.price)}/
                          {product.unitPrice}
                        </CurrentPrice>
                      </Price>
                      <span style={{ fontSize: "14px" }}>
                        T??nh tr???ng: {productStatus}
                      </span>
                      <div style={{ fontSize: "15px" }}>
                        <br />
                      </div>
                      <MoreInfo>
                        <TitleMoreInfo>Th??ng tin th??m</TitleMoreInfo>
                        <ul>
                          <LiStyled>????n v??? t??nh: {product.unitPrice}</LiStyled>
                          <LiStyled>Tr???ng l?????ng: </LiStyled>
                          <LiStyled>
                            T???ng gi?? tr??? ????n h??ng ch??a bao g???m ph?? ship h??ng.
                          </LiStyled>
                          <LiStyled>
                            Qu?? kh??ch tham kh???o b???ng ph?? ship h??ng t???i ????y
                          </LiStyled>
                          <LiStyled>
                            V?? l?? do d???ch b???nh, v???n chuy???n h??ng h??a gi??n ??o???n
                            n??n ????n h??ng s??? ???????c giao trong v??ng 3 ng??y k??? t???
                            ng??y t???o ????n h??ng. C?? th??? giao s???m h??n t??y t??nh h??nh
                            t???n kho. Mong qu?? kh??ch th??ng c???m.
                          </LiStyled>
                        </ul>
                      </MoreInfo>
                      {checkQuantity ? (
                        ""
                      ) : (
                        <QtyWrapper>
                          <span style={{ lineHeight: "32px" }}>S??? l?????ng: </span>
                          <QuantityStyled>
                            <span onClick={handleDecrement}>-</span>
                            <input
                              style={{
                                width: "30px",
                                border: "none",
                                textAlign: "center",
                              }}
                              type="text"
                              value={quantity}
                              readOnly
                            />
                            <span onClick={handleIncrement}>+</span>
                          </QuantityStyled>
                        </QtyWrapper>
                      )}

                      <ButtonStyled
                        variant="contained"
                        disabled={disableButton}
                        onClick={addToCartHandler}
                      >
                        <h4 style={{ margin: "0 auto" }}>{buttonText}</h4>
                        <span
                          style={{ fontWeight: "600", textTransform: "none" }}
                        >
                          {buttonSubText}
                        </span>
                      </ButtonStyled>
                    </PrdDetail>
                  </Grid>
                </Grid>
              </Grid>
              <GridStyled item md={3} sm={0} xs={0}>
                <HotLineStyled>
                  <p
                    style={{
                      textTransform: "uppercase",
                      fontSize: "15px",
                      fontWeight: "500",
                    }}
                  >
                    ch??ng t??i lu??n s???n s??ng ????? gi??p ????? b???n
                  </p>
                  <div className="shine">
                    <img
                      style={{ width: "100%" }}
                      src={require("./IMG/product-support.png")}
                      alt="product-sp"
                    />
                  </div>
                  <span style={{ fontSize: "16px", fontWeight: "bolder" }}>
                    ????? ???????c h??? tr??? t???t nh???t. H??y g???i
                  </span>
                  <p style={{ margin: 0 }}>
                    <HotlineNum href="tel:+0377306589">037.730.6589</HotlineNum>
                  </p>
                  <span>Ho???c</span>
                  <ButtonStyled variant="contained">
                    <span style={{ fontSize: "16px", fontWeight: "600" }}>
                      Chat v???i ch??ng t??i
                    </span>
                  </ButtonStyled>
                </HotLineStyled>
              </GridStyled>
            </Grid>
          </ContentWrapper>
          <ContentWrapper>
            <Grid container spacing={2} columns={{ xs: 12, sm: 12, md: 12 }}>
              <Grid item md={9} sm={12} xs={12}>
                <Box sx={{ width: "100%", typography: "body1" }}>
                  <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <TabList
                        onChange={handleChange}
                        aria-label="lab API tabs example"
                        textColor="primary"
                        indicatorColor="primary"
                        centered
                      >
                        <Tab label="Th??ng tin s???n ph???m" value="1" />
                        <Tab label="????nh gi??" value="2" />
                      </TabList>
                    </Box>
                    <TabPanel value="1">{product.description}</TabPanel>
                    <TabPanel value="2">
                      <h2>????nh gi?? s???n ph???m</h2>
                      {isAuthenticated ? (
                        <ButtonStyled
                          variant="contained"
                          onClick={submitReviewToggle}
                        >
                          Vi???t b??i ????nh gi??
                        </ButtonStyled>
                      ) : (
                        <p>
                          Vui l??ng <a href="/login">????ng nh???p</a> ????? ????nh gi??
                        </p>
                      )}
                      <Dialog
                        aria-labelledby="simple-dialog-title"
                        open={open}
                        onClose={submitReviewToggle}
                      >
                        <DialogTitle>G???i b??i ????nh gi??</DialogTitle>
                        <DialogContent className="submitDialog">
                          <Rating
                            onChange={(e) => setRating(e.target.value)}
                            value={rating}
                            size="large"
                          />
                          <textarea
                            className="submitDialogTextArea"
                            cols="30"
                            rows="5"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></textarea>
                          <DialogActions>
                            <Button
                              onClick={submitReviewToggle}
                              color="warning"
                            >
                              H???y
                            </Button>
                            <Button
                              onClick={reviewSubmitHandler}
                              color="primary"
                            >
                              G???i
                            </Button>
                          </DialogActions>
                        </DialogContent>
                      </Dialog>

                      {product.reviews && product.reviews[0] ? (
                        product.reviews &&
                        product.reviews.map((review) => (
                          <ListReview key={review._id} review={review} />
                        ))
                      ) : (
                        <p>Ch??a c?? ????nh gi??</p>
                      )}
                    </TabPanel>
                  </TabContext>
                </Box>
              </Grid>
              <Grid item md={3} sm={0} xs={0}>
                <Blog />
              </Grid>
            </Grid>
          </ContentWrapper>
          <SuggestedWrapper>
            <div style={{ textAlign: "left" }}>
              <h3>S???n ph???m t????ng t???</h3>
            </div>
            <ContentWrapper>
              <Suggested productProp={product} scrollToTop={scrollToTop} />
            </ContentWrapper>
          </SuggestedWrapper>
        </Container>
      )}
    </Fragment>
  );
};

export default ProductDetails;
