import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import "./header.css";
import app from "../firebaseConfig";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoURL: ""
    };
  }

  componentWillMount = () => {
    app.auth().onAuthStateChanged(user => {
      this.setState({ photoURL: user.photoURL });
    });
  };

  render() {
    return (
      <div className="shadow">
        <Card
          className="card-header"
          style={({ height: "25em" }, { background: "#2962ff" })}
        >
          <Card.Body>
            <h1 className="title">TuDu</h1>
            <img className="propic" src={this.state.photoURL}></img>
            <p className="logout" onClick={this.logOut}>
              Sign Out
            </p>
          </Card.Body>
        </Card>{" "}
      </div>
    );
  }

  logOut = () => {
    app.auth().signOut();
    window.location.reload(false);
  };
}

export default Header;
