import React, { Component } from "react";
import Card from "react-bootstrap/Card";

class Header extends Component {
  render() {
    return (
      <div className="text-center mb-3">
        <Card
          //  className="card mt-2"
          style={({ height: "25em" }, { background: "#2962ff" })}
        >
          <Card.Body>
            <h1
              //className="display-3"
              //className="col-xs-1 center-block"
              style={{ color: "white" }}
            >
              To Do
            </h1>
          </Card.Body>
        </Card>{" "}
      </div>
    );
  }
}

export default Header;
