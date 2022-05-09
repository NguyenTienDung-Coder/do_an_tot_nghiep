import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import { ButtonD, Wrapper, ContainerD } from "./style/dashboard.styled";
import styled from "styled-components";
import ChartD from "./pages/Chart";
import { Button } from "@mui/material";
import UserList from "./pages/UserList";
import ProductList from "./pages/ProductList";
import OrderList from "./pages/OrderList.jsx";


export default function Dashboard() {
  return (
    <div style={{ width: "100%" }}>
      <ContainerD>
        <Wrapper>
          <Switch>
            <Route exact path="/admin/Dashboard" >
              <ChartD/>
            </Route>
            <Route exact path="/admin/Dashboard/User" >
              <UserList/>
            </Route>
            <Route exact path="/admin/Dashboard/Product" >
              <ProductList/>
            </Route>
            <Route exact path="/admin/Dashboard/Orders" >
              <OrderList/>
            </Route>
          </Switch>
          <ButtonD href="/admin/Dashboard">
            Back to Dashboard
          </ButtonD>
        </Wrapper>
      </ContainerD>
    </div>
  );
}
