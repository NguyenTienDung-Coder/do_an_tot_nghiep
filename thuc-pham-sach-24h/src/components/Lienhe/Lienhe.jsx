import React from "react";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import Category from "../category";
import Notfound from "../notfound/notfound";
import Submit from "./Submit";
import './Lienhe.css';
import Map from "./Map";



export default function Lienhe(){
    return(
        <div>
            <Category name='Liên hệ'></Category>
            <div className="three-button">
                <div className="button-one">
                    <div className="hotline-button">
                        <LocalPhoneIcon className="local-phone-icon"/>
                    </div>
                    <h4 className="name-hotline">
                        Hotline
                    </h4>
                    <p className="cangiua"><a className="inf-three-button" href="#">077.361.4420</a></p>
                </div>
                <div className="button-one">
                    <div className="hotline-button">
                        <MailOutlineIcon className="local-phone-icon" />
                    </div>   
                    <h4 className="name-hotline">
                        Email
                    </h4>
                    <p className="cangiua"><a className="inf-three-button" href="#">webmaster@cuahangtienloi24h.com</a></p>

                </div>
                <div className="button-one">
                    <div className="hotline-button">
                        <AddLocationIcon className="local-phone-icon"/>
                    </div>
                    <h4 className="name-hotline">
                        Địa chỉ
                    </h4> 
                    <p className="cangiua"><a className="inf-three-button-one" href="#">Nguyên Khê - Đông Anh - Hà Nội</a></p>
                </div>
            </div>
            <div className="gap"></div>
            <div className="input-inf-user">
                <Submit/>        
                <h3 className="send-inf" >bản đồ cửa hàng</h3>
                <div className="gap"></div>
            </div>
            <div className="gg-map"><Map/></div>
            <div className="gap"></div>

          
        </div>
    )
}