import React, { Component } from "react";
import Welcome from "react-welcome-page";

class SplashScreen extends Component {
  render() {
    return (
      <Welcome
        loopDuration={1500}
        data={[
          {
            backgroundColor: "#2962ff",
            textColor: "#fff",
            text: "TuDu: ToDo App",
            image: require("./todo.png"),
            textAnimation: "pulse"
          }
        ]}
      />
    );
  }
}

export default SplashScreen;
