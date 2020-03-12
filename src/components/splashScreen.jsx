import React from "react";
import Welcome from "react-welcome-page";

const SplashScreen = () => {
  return (
    <Welcome
      loopDuration={1000}
      data={[
        {
          backgroundColor: "#2962ff",
          textColor: "#ffffff",
          text: "TuDu: ToDo App",
          image: require("./todo.png"),
          textAnimation: "pulse"
        }
      ]}
    />
  );
};

export default SplashScreen;
