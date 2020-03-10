import React from "react";
import Login from "./Login";
import App from "./App";

const routes = [
  { name: "Home", path: "/", exact: true, main: () => <App /> },
  { name: "Login", path: "/login", exact: true, main: () => <Login /> }
];

export default routes;
