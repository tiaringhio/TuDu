import React, { Component } from "react";
import "material-design-inspired-color-picker";

class ColorSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <md-color-picker
        color-margin="6"
        colors-per-row="8"
        color-size="25"
        default-tint="500"
        fixedMinHeight="true"
        palette="material"
        use-spectrum-picker="true"
        value="#1e88e5"
      ></md-color-picker>
    );
  }
}

export default ColorSelector;
