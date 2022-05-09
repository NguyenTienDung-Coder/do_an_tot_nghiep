import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { loadUser } from "./actions/userAction";
import "./App.css";
import AccInformation from "./components/Account/AccInformation";
import Dashboard from "./components/Admin/Dashboard";
import NewProduct from "./components/Admin/pages/NewProduct";
import OrderList from "./components/Admin/pages/OrderList";
import ProcessOrder from "./components/Admin/pages/ProcessOrder";
import ProductList from "./components/Admin/pages/ProductList";
import UpdateProduct from "./components/Admin/pages/UpdateProduct";
import UpdateUser from "./components/Admin/pages/UpdateUser";
import UserList from "./components/Admin/pages/UserList";
import GioHang from "./components/Cart/pages/GioHang";
import HoanTat from "./components/Cart/pages/HoanTat";
import ThanhToan from "./components/Cart/pages/ThanhToan";
import Footer from "./components/footer/footer";
import Gioithieu from "./components/Gioithieu/gioithieu";
import Header from "./components/header/header";
import Homepage from "./components/home/Homepage";
import Lienhe from "./components/Lienhe/Lienhe";
import Login from "./components/login/login";
import Meohay from "./components/Meohay/Meohay";
import Notfound from "./components/notfound/notfound";
import MyOrder from "./components/Order/MyOrder";
import OrderDetails from "./components/Order/OrderDetails";
import ProductCate from "./components/Product/ProductCate";
import ProductDetails from "./components/Product/ProductDetails";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import News from "./components/Tintuc/News";
import store from "./store";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <div className="App">
      <Header />

      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route path="/gioi-thieu">
          <Gioithieu />
        </Route>
        <Route exact path="/gio-hang">
          <GioHang />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/san-pham">
          <ProductCate />
        </Route>
        <Route exact path="/tin-tuc">
          <News />
        </Route>
        <Route exact path="/meo-hay">
          <Meohay />
        </Route>
        <Route exact path="/lien-he">
          <Lienhe />
        </Route>
        <Route path="/products/:keyword" component={ProductCate} />
        <Route path="/products/:category" component={ProductCate} />
        <Route exact path="/product/:id" component={ProductDetails} />
        <ProtectedRoute exact path="/thanh-toan" component={ThanhToan} />
        <ProtectedRoute exact path="/hoan-tat" component={HoanTat} />
        <ProtectedRoute exact path="/orders" component={MyOrder} />
        <ProtectedRoute exact path="/order/:id" component={OrderDetails} />
        <ProtectedRoute exact path="/edit-account" component={AccInformation} />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/Dashboard"
          component={Dashboard}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/Dashboard/User"
          component={UserList}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/Dashboard/Orders"
          component={OrderList}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/Dashboard/Product"
          component={ProductList}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/Dashboard/NewProduct"
          component={NewProduct}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/Dashboard/Product/:id"
          component={UpdateProduct}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/Dashboard/User/:id"
          component={UpdateUser}
        />
        <ProtectedRoute
          exact
          path="/admin/Dashboard/Order/:id"
          isAdmin={true}
          component={ProcessOrder}
        />
        <Route path="" component={Notfound} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
