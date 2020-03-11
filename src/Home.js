import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Login";
import App from "./App";
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";

const Home = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <div>
            <PrivateRoute exact path="/" component={App} />
            <Route exact path="/login" component={Login} />
          </div>
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default Home;
