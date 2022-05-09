import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import styled from "styled-components";
import { green, grey, lightGreen } from "@mui/material/colors";
import PieChartIcon from "@mui/icons-material/PieChart";
import GroupIcon from '@mui/icons-material/Group';
import InventoryIcon from '@mui/icons-material/Inventory';
import FeedIcon from '@mui/icons-material/Feed';
import FaceIcon from '@mui/icons-material/Face';
const WrapperSidebar = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 23%;
  height: 100%;
  @media screen and (max-width: 850px) {
    display: none;
  }
`;
const SidebarA = styled.a`
align-self: center;
padding: 5px 10px;
  text-decoration: none;
  color: #6b6b6b;
`;
const ImgS = styled.img`
  max-width: 190px;
`;

const Bardiv = styled.div`
display: flex;
  margin: 10px 0px;
  width: 100%;
  padding: 20px 10px;
  &:hover {
    background-color: #e9e6e6;
  }
`;

const Sidebar = () => {
  return (
    <WrapperSidebar>
      <div>
       <a href="/Dashboard">
       <ImgS
          src="https://cuahangtienloi24h.com/wp-content/uploads/2021/07/cua-hang-tot-nhat-green.png"
          alt=""
        />
       </a>
      </div>
      <Bardiv>
        <PieChartIcon
        sx={{ color: lightGreen[700]}}/>
        <SidebarA href="/admin/Dashboard/">Bảng điều khiển</SidebarA>
      </Bardiv>
      <Bardiv>
        <GroupIcon sx={{ color: lightGreen[700]}}/>
        <SidebarA href="/admin/Dashboard/User">Người dùng</SidebarA>
      </Bardiv>
      <Bardiv>
        <InventoryIcon sx={{ color: lightGreen[700]}}/>
        <SidebarA href="/admin/Dashboard/Product">Sản phẩm</SidebarA>
      </Bardiv>
      <Bardiv>
        <FaceIcon sx={{ color: lightGreen[700]}}/>
        <SidebarA href="/admin/Dashboard/Orders">Đơn hàng</SidebarA>
      </Bardiv>
    </WrapperSidebar>
  );
};

export default Sidebar;