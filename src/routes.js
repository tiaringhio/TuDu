import React from "react";
import Login from "./Login";
import Join from "./Join";
import App from "./App";

const routes = [
  { name: "Home", path: "/home", exact: true, main: () => <App /> },
  { name: "Join", path: "/join", exact: true, main: () => <Join /> },
  { name: "Login", path: "/login", exact: true, main: () => <Login /> }
];

export default routes;
