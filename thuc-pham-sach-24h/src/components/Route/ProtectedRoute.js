import React from "react";
import { useSelector } from "react-redux";
import { Link, Route, Switch, useHistory } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  let history = useHistory();

  return (
    <Switch>
      {loading === false && (
        <Route
          {...rest}
          render={(props) => {
            if (isAuthenticated === false) {
              console.log("Chuyen den login");
              // return <Link to="/login" />;
              history.push("/login");
            }

            if (isAdmin === true && user.role !== "admin") {
              history.push("/login");
            }

            return <Component {...props} />;
          }}
        />
      )}
    </Switch>
  );
};

export default ProtectedRoute;
