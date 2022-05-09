import React, { Fragment, useEffect } from "react";
import styled from "styled-components";
import ScrollSpy from "react-scrollspy-navigation";
import { Grid, Container } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Product from "../Product/Product";
import "./Homepage.css";
import { getAdminProduct, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader/Loader";

const ProductWrapper = styled.div`
  padding-bottom: 5px;
  position: relative;
  border: 1px solid #51aa1b;
  border-radius: 9px;
  height: 100%;
  width: 100%;
  text-align: center;
  &:hover {
    border: 1px solid orange;
  }
`;
const ContentWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  margin-bottom: 2rem;
`;

function Homepage() {
  const { loading, products } = useSelector(
    (state) => state.productsAdmin
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAdminProduct());
  }, [dispatch]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="background">
          <div className="background-img">
            <div className="button-on-background">
              <div className="on-bg">
                <p className="label-new">Giá tốt hôm nay</p>
                <h2 className="h2">hàng mới về</h2>
                <p className="ten-hs">
                  Hải sản, thịt gà, vịt – Hàng luôn tươi mới mỗi ngày.
                </p>
              </div>
              <div className="content-section-one">
                <div className="text-inner">
                  <h4 className="h4">Hải sản, thịt, cá các loại</h4>
                  <h5 className="h5">Hàng luôn tươi mới mỗi ngày</h5>
                  <ScrollSpy>
                    <a href="#haisan" ref={React.createRef()}>
                      <span className="span-home">Hải sản</span>
                    </a>
                    <a href="#thit" ref={React.createRef()}>
                      <span className="span-home">Thịt</span>
                    </a>
                    <a href="#mam" ref={React.createRef()}>
                      <span className="span-home">Mắm</span>
                    </a>
                    <a href="/home">...</a>

                    <a href="#haisan" ref={React.createRef()}>
                      <div className="arrow-down">
                        <ArrowBackIosIcon className="arrow-home-page" />
                      </div>
                    </a>
                  </ScrollSpy>
                </div>
              </div>
            </div>
          </div>
          <Container>
            <div className="product">
              <h3 className="h3">
                <span id="haisan">hải sản</span>
              </h3>
              <hr />
              <Grid
                container
                spacing={{ xs: 2, md: 2 }}
                columns={{ xs: 4, sm: 9, md: 12 }}
              >
                {products &&
                  products
                    .filter((product) => product.category === "Hải sản")
                    .map((product) => (
                      <Grid item xs={2} sm={3} md={3} key={product._id}>
                        <ProductWrapper>
                          <Product product={product} />
                        </ProductWrapper>
                      </Grid>
                    ))}
              </Grid>

              <h3 className="h3">
                <span id="mam">Mắm</span>
              </h3>
              <hr />
              <Grid
                container
                spacing={{ xs: 2, md: 2 }}
                columns={{ xs: 4, sm: 9, md: 12 }}
              >
                {products &&
                  products
                    .filter((product) => product.category === "Mắm")
                    .map((product) => (
                      <Grid item xs={2} sm={3} md={3} key={product._id}>
                        <ProductWrapper>
                          <Product product={product} />
                        </ProductWrapper>
                      </Grid>
                    ))}
              </Grid>

              <h3 className="h3">
                <span id="thit">thịt các loại</span>
              </h3>
              <hr />
              <Grid
                container
                spacing={{ xs: 2, md: 2 }}
                columns={{ xs: 4, sm: 9, md: 12 }}
              >
                {products &&
                  products
                    .filter((product) => product.category === "Thịt")
                    .map((product) => (
                      <Grid item xs={2} sm={3} md={3} key={product._id}>
                        <ProductWrapper>
                          <Product product={product} />
                        </ProductWrapper>
                      </Grid>
                    ))}
              </Grid>

              <h3 className="h3">
                <span id="mam">cá</span>
              </h3>
              <hr />
              <Grid
                container
                spacing={{ xs: 2, md: 2 }}
                columns={{ xs: 4, sm: 9, md: 12 }}
              >
                {products &&
                  products
                    .filter((product) => product.category === "Cá")
                    .map((product) => (
                      <Grid item xs={2} sm={3} md={3} key={product._id}>
                        <ProductWrapper>
                          <Product product={product} />
                        </ProductWrapper>
                      </Grid>
                    ))}
              </Grid>

              <div className="content-product">
                <div className="tutorial-name">
                  <h3 className="add-kitchen">
                    <span style={{textTransform: "uppercase"}}>vào bếp</span>
                  </h3>
                  <p className="tutorial-one">
                    Cách nấu món ăn ngon mỗi ngày dễ làm cùng chuyên gia
                  </p>
                </div>
                <div className="inf-tutorial">
                  <div className="grid-item-kitchen">
                    <img
                      className="img-bep"
                      src="https://cuahangtienloi24h.com/wp-content/uploads/2021/10/cach-lam-tom-mot-nang-don-gian-ngot-dai-de-an-tet-1633707818.jpg"
                      alt=""
                    />
                    <h5 className="name-item-bep">
                      Cách làm tôm một nắng đơn giản ngọt dai để ăn Tết
                    </h5>
                    <p className="tutorial-kitchen">
                      Tôm một nắng, món ăn cực kỳ phù hợp cho ngày lễ Tết, với
                      công...
                    </p>
                  </div>
                  <div className="grid-item-kitchen">
                    <img
                      className="img-bep"
                      src="https://cuahangtienloi24h.com/wp-content/uploads/2021/09/cach-lam-kho-ca-du-thom-ngon-la-vi-de-lam-tai-nha-1632655756.jpg"
                      alt=""
                    />
                    <h5 className="name-item-bep">
                      Cách làm tôm một nắng đơn giản ngọt dai để ăn Tết
                    </h5>
                    <p className="tutorial-kitchen">
                      Tôm một nắng, món ăn cực kỳ phù hợp cho ngày lễ Tết, với
                      công...
                    </p>
                  </div>
                  <div className="grid-item-kitchen">
                    <img
                      className="img-bep"
                      src="https://cuahangtienloi24h.com/wp-content/uploads/2021/09/cach-lam-ca-na-dap-chua-ngot-thom-ngon-hap-dan-cuc-don-gian-1632654820.jpg"
                      alt=""
                    />
                    <h5 className="name-item-bep">
                      Cách làm tôm một nắng đơn giản ngọt dai để ăn Tết
                    </h5>
                    <p className="tutorial-kitchen">
                      Tôm một nắng, món ăn cực kỳ phù hợp cho ngày lễ Tết, với
                      công...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Container>

          <h3 className="add-kitchen-one">
            <span>ĐI CHỢ MUA RAU ONLINE GÓI GỌN TRONG BÀN TAY</span>
          </h3>
          <div className="information-store">
            <div className="ask-and-answer">
              <p className="tutorial">
                <strong>Mua rau sạch online</strong> đang là hình thức mua hàng
                nhận được nhiều sự quan tâm nhất của khách hàng hiện nay, hiểu
                và nắm được nhu cầu của phần đông người tiêu dùng chúng tôi đã
                nhập rất nhiều người hàng rau sạch về cửa hàng và phục vụ cho
                nhu cầu của tất cả mọi khách hàng một cách nhanh chính và thuận
                tiện nhất. Chúng tôi nhất định sẽ mang đến những bữa ăn thật
                ngon và đầy đủ chất dinh dưỡng cho tất cả thành viên trong gia
                đình bạn mỗi ngày
                <strong> Cuahangtienloi24h.com</strong> là một trong những
                website đi chợ online có sức ảnh hưởng và thu hút sự chú ý của
                nhiều người trong thời gian qua, với loạt ưu điểm sáng giá, như
                chỉ cần vài cú click đơn giản là bạn có thể dễ dàng lựa chọn
                những loại thực phẩm tươi ngon nhất cho bữa cơm gia đình dù đang
                ở nơi đâu. Tiết kiệm thời gian, không chen chúc mua đồ và xếp
                hàng thanh toán Bạn có thể đặt mua rau củ quả online và rất
                nhiều mặt hàng khác nữa trên website
                <strong>cuahangtienloi24h.com</strong>
              </p>
              <h4 className="why">
                Tại sao lại mua thực phẩm online tại CuaHangTienLoi24h.com?
              </h4>
              <p className="tutorial">
                Là 1 trong những website đi chợ online đầu tiên tại Việt Nam,
                <strong> Cuahangtienloi24h.com</strong> đã mang lại nhiều ưu thế
                cũng như cạnh tranh mạnh mẽ so với cách đi chợ truyền thống
              </p>
              <p className="tutorial">
                <li>
                  <strong>Nguồn hàng tươi sống an toàn – giá rẻ:</strong> Chợ
                  thực phẩm online là nơi có thể mua rau củ quả, thịt, trái cây
                  nguồn gốc rõ ràng, với định lượng rõ ràng. Thậm chí bạn còn có
                  thể tìm thấy những món đặc sản vùng miền mà không cần cất công
                  tìm kiếm cửa hàng.
                </li>
                <li>
                  <strong>Tiện dụng và tiết kiệm:</strong> với giao diện website
                  đẹp mắt, thiết kế tối ưu, hỗ trợ bạn dễ dàng tìm kiếm và mua
                  thực phẩm online đúng nhu cầu. Ngoài việc tiết kiệm chi phí đi
                  lại, hình thức đi chợ online còn có nhiều ưu điểm khác: an
                  toàn trong mùa dịch, tiết kiệm công sức, thời gian đi lại,
                  miễn phí ship cho đơn hàng từ 500.000đ trở lên.
                </li>
                <li>
                  <strong>Thanh toán linh hoạt:</strong> cạnh hình thức trả tiền
                  mặt khi nhận hàng, chúng tôi còn nhận thanh toán qua tài khoản
                  ngân hàng, ví điện tử Momo…
                </li>
              </p>
            </div>
            <div className="iphone-img-pro">
              <img
                className="iphone-img"
                src="https://cuahangtienloi24h.com/wp-content/uploads/2021/08/cuahangtienloi24h.com__iphone12prosilver_portrait-e1627789914473.png"
                alt=""
              />
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default Homepage;