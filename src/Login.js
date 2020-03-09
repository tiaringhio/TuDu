import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "./index";
import * as firebase from "firebase";
import { withRouter } from "react-router-dom";
import logo from "./components/todo.png";
import SplashScreen from "./components/splashScreen";
import "./login.css";

const Login = ({ history }) => {
  const [error, setErrors] = useState("");
  const Auth = useContext(AuthContext);
  console.log("isloggedin: ", Auth.isLoggedIn);

  useEffect(() => {
    if (Auth.isLoggedIn) history.push("/");
  }, [Auth.isLoggedIn]);

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        firebase
          .auth()
          .signInWithPopup(provider)
          .then(result => {
            Auth.setLoggedIn(true);
            window.location.reload(false);
            const account = {
              useruid: result.user.uid,
              displayname: result.user.displayName
            };
            console.log("account created", result.user.uid);
            firebase
              .firestore()
              .collection("users")
              .doc(result.user.uid)
              .add(account);
          })
          .catch(function(error) {
            console.error("Something went wrong with the login: ", error);
          });
      });
  };

  return (
    <React.Fragment>
      <SplashScreen />
      <div
        style={{
          backgroundColor: "#2962ff",
          height: "100vh"
        }}
      >
        <h1>Login</h1>
        <img className="logo" src={logo}></img>
        <button
          onClick={() => signInWithGoogle()}
          className="googleBtn"
          type="button"
        >
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
