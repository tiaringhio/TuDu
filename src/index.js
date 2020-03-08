import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import routes from "./routes.js";
import protectedRoutes from "./protectedRoutes";
import * as firebase from "firebase";
import firebaseConfig from "./firebase.config";
import ProtectedRouteHoc from "./ProtectedRouteHoc";

firebase.initializeApp(firebaseConfig);

export const AuthContext = React.createContext(null);

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [sessionUID, setSessionUID] = useState("");

  function readSession() {
    const user = window.sessionStorage.getItem(
      `firebase:authUser:${firebaseConfig.apiKey}:[DEFAULT]`
    );
    //
    if (user) {
      setLoggedIn(true);
    }
  }
  function getSessionUID() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setSessionUID(user.uid);
      }
    });
  }

  useEffect(() => {
    readSession();
    getSessionUID();
  }, []);

  // console.log(window.sessionStorage.getItem(value));
  return (
    <AuthContext.Provider
      value={({ isLoggedIn, setLoggedIn }, { sessionUID, setSessionUID })}
    >
      Is logged in? {JSON.stringify(isLoggedIn)}, UID:{" "}
      {JSON.stringify(sessionUID)}}
      <div className="App">
        <Router>
          <Switch>
            {protectedRoutes.map(route => (
              <ProtectedRouteHoc
                key={route.path}
                isLoggedIn={isLoggedIn}
                path={route.path}
                component={route.main}
                exact={route.exact}
                public={route.public}
              />
            ))}
            {routes.map(route => (
              <Route
                key={route.path}
                path={route.path}
                exact={route.exact}
                component={route.main}
              />
            ))}
          </Switch>
        </Router>
      </div>
    </AuthContext.Provider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
