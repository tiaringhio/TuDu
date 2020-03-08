import React, { useState, useContext } from "react";
import { AuthContext } from "./index";
import * as firebase from "firebase";
import { withRouter } from "react-router-dom";
import logo from "./components/todo.png";
import "./login.css";

const Login = ({ history }) => {
  const [error, setErrors] = useState("");
  const Auth = useContext(AuthContext);

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
            console.log(result);
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
            Auth.setLoggedIn(true);
            // history.push("/");
          })
          .catch(e => setErrors(e.message));
      });
  };

  const goHome = () => {
    history.push("/");
  };
  return (
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
      <button onClick={() => goHome()}>Go Home</button>
    </div>
  );
};

export default withRouter(Login);
