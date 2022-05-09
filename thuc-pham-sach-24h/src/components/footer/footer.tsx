import React from "react";
import './footer.scss';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Link } from "react-router-dom";
import YouTubeIcon from '@mui/icons-material/YouTube';
import red from "@mui/material/colors/red";
import FacebookIcon from '@mui/icons-material/Facebook';
import { blue } from "@mui/material/colors";
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
Footer.proTypes = {}
function Footer() {
    return (
        <div className="footer">
            <div className="regis">
                <div className="regis-container">
                    <div className="box-content">
                        <div className="box">
                            <img src="https://cdn-icons-png.flaticon.com/512/7115/7115936.png" alt="" />
                        </div>
                        <div className="content">
                            <h5>
                                ĐĂNG KÝ NHẬN TIN
                            </h5>
                            <p>
                                Hãy nhận ưu đãi hấp dẫn từ CuahangTienLoi24h.com nào!
                            </p>
                        </div>

                    </div>
                    <div className="link-email">
                        <div className="input-email">
                            <input type='email' placeholder="Nhập email của bạn"></input>
                        </div>
                        <div className="button-container">
                            <button>ĐĂNG KÝ</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-bottom-container">
                <div className="footer-bottom">
                    <div className="box-intro">
                        <img src="https://cuahangtienloi24h.com/wp-content/uploads/2021/07/cua-hang-tot-nhat-green.png" alt="" />
                        <p>Địa chỉ mua rau online TP.HCM. Chuyên bán hải sản, thịt cá, rau sạch, củ quả, trái cây, thực phẩm tươi sống.</p>
                        <div className="iconSocial">
                            <a className="aSocial" href="" title="Follow us on Youtube">
                                <YouTubeIcon
                                    sx={{ color: red[500], fontSize: 40 }} />
                            </a>
                            <a className="aSocial" href="https://www.facebook.com/storefood24h" title="Follow us on Facebook">
                                <FacebookIcon
                                    sx={{ color: blue[800], fontSize: 40 }} />
                            </a>
                            <a className="aSocial" title="Follow us on Instagram">
                                <InstagramIcon
                                    sx={{ color: red[300], fontSize: 40 }} />
                            </a>
                            <a className="aSocial" title="Follow us on Twitter">
                                <TwitterIcon
                                    sx={{ color: blue[500], fontSize: 40 }} />
                            </a>
                        </div>
                    </div>
                    <div className="box-contact">
                        <h4>THÔNG TIN LIÊN HỆ</h4>
                        <p>
                            <LocationOnIcon sx={{ fontSize: 15 }} />
                            <span>23/25D đường số 1, phường Bình Thuận, Q.7, TP.HCM</span>
                        </p>
                        <a href="tel:+0941.037.037">
                            <p>
                                <LocalPhoneIcon sx={{ fontSize: 15 }} />
                                <span>0941.037.037</span>
                            </p>
                        </a>
                        <a href="mailto:webmaster@cuahangtienloi24h.com">
                            <p>
                                <MailOutlineIcon sx={{ fontSize: 15 }} />
                                <span>webmaster@cuahangtienloi24h.com</span>
                            </p>
                        </a>
                    </div>
                    <div className="box-sup">
                        <h4>HỖ TRỢ KHÁCH HÀNG</h4>
                        <a href="#"><p>Thông tin tuyển dụng</p></a>
                        <a href="#"><p>Chính sách khách hàng</p></a>
                        <a href="#"><p>Chính sách bảo mật</p></a>
                        <a href="#"><p>Hợp tác nhượng quyền</p></a>
                        <a href="#"><p>Điều khoản sử dụng</p></a>
                    </div>
                </div>
            </div>
            <div className="bottom-list">
                <div className="bottom-list-container">
                    <div className="list-node" >
                        <a href="#" >
                            <span>THỰC PHẨM ONLINE</span>
                        </a>
                    </div>
                    <div className="list-node">
                        <a href="#">
                            <span>THỊT CÁ ONLINE</span>
                        </a>
                    </div>
                    <div className="list-node">
                        <a href="#">
                            <span>HẢI SẢN ONLINE</span>
                        </a>
                    </div>
                    <div className="list-node">
                        <a href="#">
                            <span>
                                CHỢ RAU CỦ ONLINE
                            </span>
                        </a>
                    </div>
                    <div className="list-node">
                        <a href="#">
                            <span>BÁN RAU CỦ QUẢ ONLINE</span>
                        </a>
                    </div>
                </div>
            </div>

            <div className="design-by">
                <div className="design-by-in">
                    <a href="#">
                        <span style={{ fontSize: "13px" }}>
                            © Thiết kế bởi GiaoHangTotNhat.vn
                        </span>
                    </a>
                </div>
            </div>
        </div>
    )
}
export default Footer;