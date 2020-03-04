import React, { useState, useContext } from "react";
import { AuthContext } from "./index";
import * as firebase from "firebase";
import { withRouter } from "react-router-dom";
import Image from "react-bootstrap/Image";
import logo from "./components/todo.png";
import "./login.css";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrors] = useState("");

  const Auth = useContext(AuthContext);
  // const handleForm = e => {
  //   e.preventDefault();
  //   firebase
  //     .auth()
  //     .setPersistence(firebase.auth.Auth.Persistence.SESSION)
  //     .then(() => {
  //       firebase
  //         .auth()
  //         .signInWithEmailAndPassword(email, password)
  //         .then(res => {
  //           if (res.user) Auth.setLoggedIn(true);
  //           history.push("/home");
  //         })
  //         .catch(e => {
  //           setErrors(e.message);
  //         });
  //     });
  // };

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
            history.push("/home");
            Auth.setLoggedIn(true);
          })
          .catch(e => setErrors(e.message));
      });
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

      {/* <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          name="email"
          type="email"
          placeholder="email"
        />
        <input
          onChange={e => setPassword(e.target.value)}
          name="password"
          value={password}
          type="password"
          placeholder="password"
        />
        <hr />
        <button
          onClick={() => signInWithGoogle()}
          className="googleBtn"
          type="button"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="logo"
          />
          Login With Google
        </button>
        <button type="submit">Login</button>
        <span>{error}</span> */}
    </div>
  );
};

export default withRouter(Login);
