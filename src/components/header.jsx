import React, { Component } from "react";
import Card from "react-bootstrap/Card";

class Header extends Component {
  render() {
    // const { isLoggedIn } = useContext(AuthContext);
    return (
      <div className="text-center mb-3">
        <Card style={({ height: "25em" }, { background: "#2962ff" })}>
          <Card.Body>
            <h1 style={{ color: "white" }}>TuDu</h1>
          </Card.Body>
        </Card>{" "}
      </div>
    );
  }
}

export default Header;
