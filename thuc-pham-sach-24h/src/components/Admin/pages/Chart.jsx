import { Container, Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { grey } from "@mui/material/colors";
import { Box } from "@mui/system";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { Doughnut, Line } from "react-chartjs-2";
import Chart from 'chart.js/auto'
import Sidebar from "../Sidebar";
import { ButtonD, ContainerD } from "../style/dashboard.styled";
import { getAllUsers } from "../../../actions/userAction";
import { getAllOrders } from "../../../actions/orderAction";
import { getAdminProduct } from "../../../actions/productAction";

const ChartContainer = styled.div`
  width: 100%;
  min-height: 100%;
  padding: 0;
`;
const ChartHeader = styled.div`
  width: 100%;
  max-width: 100%;
  min-height: 100px;
  padding: 25px 0px;
  background-color: #59a552;
  padding: 0;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
const H1header = styled.h1`
  color: white;
  text-align: center;
  align-self: center;
`;
const Datadiv = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;
const BoxData = styled.div`
  margin-top: 20px;
  width: 250px;
  height: 250px;
  border-radius: 50%;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
`;
const TagA = styled.a`
  text-decoration: none;
  color: black;
`;
const LineChart = styled.div`
  width: 100%;
  margin: 20px 0px;
  
`
export default function ChartD() {
  /*  useEffect(() => {
      const fecthProduct = async() => {
          var data = await axios.get("http://localhost:4000/api/v1/products")
          console.log(data.data.productsCount)
      }
      fecthProduct()
  }) */
  const dispatch = useDispatch()

  const { products , errors } = useSelector((state) => state.productsAdmin);

  const { orders } = useSelector((state) => state.allOrders)

  const { users } = useSelector((state) => state.allUsers)

  let outOfStock = 0

  products && products.forEach((item) => {
    if(item.Stock === 0) {
      outOfStock +=1
    }
  })

  useEffect(() => {
    if(errors){
      alert(errors)
    }

    
  }, [errors])

  useEffect(() => {
    dispatch(getAdminProduct())
    dispatch(getAllOrders())
    dispatch(getAllUsers())
  }, [dispatch])

  let totalAmount = 0
  orders && orders.forEach((item) => {
    totalAmount += item.totalPrice
  })




  const lineState = {
    labels : ["Số tiền ban đầu", "Số tiền kiếm được"],
    datasets: [
      {
        label: "Tổng",
        backgroundColor: ["#509f49"],
        hoverBackgrounColor: ["#4f9347"],
        data: [0, totalAmount]
      }
    ]
  }
  const doughnutSate = {
    labels : ["Hết hàng", "Hàng trong kho"],
    datasets : [
      {
        backgroundColor: ["#38a23b", "#a43131"],
        hoverBackgrounColor: ["#2f8e32", "#a43131"],
        data: [outOfStock, products.length - outOfStock]
      }
    ]
  }

  return (
    
    <ContainerD>
    <Sidebar/>
    <ChartContainer>
      <ChartHeader>
        <H1header>BẢNG ĐIỀU KHIỂN</H1header>
      </ChartHeader>
      <Datadiv>
        <BoxData style={{ backgroundColor: "#ffe6cc" }}>
          <TagA href="/admin/Dashboard/Product">
            <h1>Sản phẩm</h1>
          </TagA>
          <h2 id="a">{products && products.length}</h2>
        </BoxData>
        <BoxData style={{ backgroundColor: "#ccebff" }}>
          <TagA href="/admin/Dashboard/Orders">
            <h1>Đơn hàng</h1>
          </TagA>
          <h2>{orders && orders.length}</h2>
        </BoxData>
        <BoxData style={{ backgroundColor: "#f2ccff" }}>
          <TagA href="/admin/Dashboard/User">
            <h1>Người dùng</h1>
          </TagA>
          <h2>{users && users.length} </h2>
        </BoxData>
      </Datadiv>
      <LineChart>
        <Line data={lineState} />
      </LineChart>
      <LineChart>
        <Doughnut data={doughnutSate} />
      </LineChart>
    </ChartContainer>
    </ContainerD>
  );
}