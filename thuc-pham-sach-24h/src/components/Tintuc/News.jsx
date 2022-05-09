import Category from "../category";
import './News.css';


function News () {
    return(
        <div className="page-news">
            <Category name='Tin tức'></Category>
            <div className="all-new">
                <div className="all-categories">
                    <div className="categories-one">
                        <span className="span-categories">Chuyên mục</span>
                        <li className="li-categories-t" ><a href="#">Mẹo hay</a></li>
                        <li className="li-categories-t" ><a href="#">Món ngon</a></li>
                        <li className="li-categories" ><a href="#">Tin tứ</a>c</li>
                    </div>
                    <div className="categories-one-t">
                        <span className="span-categories">bài mới</span>
                        <li className="li-categories-t" ><a href="#">Cách làm tôm một nắng đơn giản ngọt dai để ăn Tết</a></li>
                        <li className="li-categories-t" ><a href="#">Cách làm khô cá đù thơm ngon, lạ vị dễ làm tại nhà</a></li>
                        <li className="li-categories-t" ><a href="#">Cách làm cà na đập muối ớt, thơm ngon hấp dẫn, cực đơn giản</a>c</li>
                        <li className="li-categories-t" ><a href="#">Hướng dẫn chế biến cá hồi cho bé ăn cơm hoặc ăn dặm</a></li>
                        <li className="li-categories" ><a href="#">Cách sơ chế rau củ quả đúng cách, an toàn cho sức khỏe</a></li>


                    </div>
                </div>



                <div className="thong-tin">
                    <div className="news-one">
                        <img className="img-news" src="https://cuahangtienloi24h.com/wp-content/uploads/2021/07/tac-dung-cua-mong-toi-an-ngon-song-khoe-cung-mong-toi-1626545128.jpg" alt="" />
                        <h5 className="inf-h5">Tác dụng của mồng tơi – Ăn ngon sống khoẻ cùng mồng tơi</h5>
                        <p className="inf-p">Rau mồng tơi&nbsp;là món ăn dân giã nhưng lại là món ăn bài thuốc quen...</p>
                    </div>
                    <div className="news-one">
                        <img className="img-news" src="https://cuahangtienloi24h.com/wp-content/uploads/2021/07/mua-hang-bang-tem-phieu-thoi-bao-cap-1626356015-400x234.jpg" alt="" />
                        <h5 className="inf-h5">Tác dụng của mồng tơi – Ăn ngon sống khoẻ cùng mồng tơi</h5>
                        <p className="inf-p">Rau mồng tơi&nbsp;là món ăn dân giã nhưng lại là món ăn bài thuốc quen...</p>
                    </div>
                    <div className="news-one">
                        <img className="img-news" src="https://cuahangtienloi24h.com/wp-content/uploads/2021/07/vi-sao-gia-rau-cu-qua-nha-vuon-re-cho-tp-hcm-lai-cao-dot-bien-1626308150.jpg" alt="" />
                        <h5 className="inf-h5">Tác dụng của mồng tơi – Ăn ngon sống khoẻ cùng mồng tơi</h5>
                        <p className="inf-p">Rau mồng tơi&nbsp;là món ăn dân giã nhưng lại là món ăn bài thuốc quen...</p>
                    </div>
                    <div className="news-one">
                        <img className="img-news" src="https://cuahangtienloi24h.com/wp-content/uploads/2021/07/thuc-pham-tuoi-song-ram-ro-len-san-online-1626081066-400x266.jpg" alt="" />
                        <h5 className="inf-h5">Tác dụng của mồng tơi – Ăn ngon sống khoẻ cùng mồng tơi</h5>
                        <p className="inf-p">Rau mồng tơi&nbsp;là món ăn dân giã nhưng lại là món ăn bài thuốc quen...</p>
                    </div>
                    <div className="news-one">
                        <img className="img-news" src="https://cuahangtienloi24h.com/wp-content/uploads/2021/07/mua-rau-sach-online-tp-hcm-o-dau-uy-tin-chat-luong-1625781492-400x300.jpg" alt="" />
                        <h5 className="inf-h5">Tác dụng của mồng tơi – Ăn ngon sống khoẻ cùng mồng tơi</h5>
                        <p className="inf-p">Rau mồng tơi&nbsp;là món ăn dân giã nhưng lại là món ăn bài thuốc quen...</p>
                    </div>
                    <div className="news-one">
                        <img className="img-news" src="https://cuahangtienloi24h.com/wp-content/uploads/2020/08/bach-tuoc-nuong-va-5-cach-che-bien-thom-ngon-de-ban-don-mua-mua-ve-400x267.jpg" alt="" />
                        <h5 className="inf-h5">Tác dụng của mồng tơi – Ăn ngon sống khoẻ cùng mồng tơi</h5>
                        <p className="inf-p">Rau mồng tơi&nbsp;là món ăn dân giã nhưng lại là món ăn bài thuốc quen...</p>
                    </div>
                    <div className="news-one">
                        <img className="img-news" src="https://cuahangtienloi24h.com/wp-content/uploads/2020/08/muc-ong-chien-gion-cach-lam-ngon-dung-chuan-nha-hang-cuc-de-400x275.jpg" alt="" />
                        <h5 className="inf-h5">Tác dụng của mồng tơi – Ăn ngon sống khoẻ cùng mồng tơi</h5>
                        <p className="inf-p">Rau mồng tơi&nbsp;là món ăn dân giã nhưng lại là món ăn bài thuốc quen...</p>
                    </div>
                </div>
            </div>
        <div className="gap"></div>
        </div>
    )
}


export default News;