import React from "react";
import App from "./App";

const protectedRoutes = [
  {
    name: "home",
    exact: true,
    path: "/",
    main: props => <App {...props} />,
    public: false
  }
];

export default protectedRoutes;
