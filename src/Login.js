import React, { useState, useContext, useCallback } from "react";
import { AuthContext } from "./Auth.js";
import * as firebase from "firebase";
import { withRouter, Redirect } from "react-router-dom";
import logo from "./components/todo.png";
import SplashScreen from "./components/splashScreen";
import "./login.css";
import app from "./firebaseConfig.js";

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const provider = new firebase.auth.GoogleAuthProvider();
      await app
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          const account = {
            useruid: result.user.uid,
            displayname: result.user.displayName
          };
          console.log("account created", result.user.uid);
          app
            .firestore()
            .collection("users")
            .doc(result.user.uid)
            .set(account);
        })
        .catch(function(error) {
          console.error("Something went wrong with the login: ", error);
        });
      history.push("/");
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <React.Fragment>
      <div
        style={{
          backgroundColor: "#2962ff",
          height: "100vh"
        }}
      >
        <h1>Login</h1>
        <img className="logo" src={logo}></img>
        <button onClick={handleLogin} className="googleBtn" type="button">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="Googlelogo"
          />
          Login With Google
        </button>
      </div>
    </React.Fragment>
  );
};

export default withRouter(Login);
