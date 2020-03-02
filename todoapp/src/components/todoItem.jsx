import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./todoItem.css";
import { TwitterPicker } from "react-color";
class ToDoItem extends Component {
  state = {
    displayColorPicker: false,
    background: "#fff"
  };
  render() {
    const { todo } = this.props;

    const popover = {
      position: "absolute",
      zIndex: "2"
    };

    const cover = {
      position: "fixed",
      top: "0px",
      right: "0px",
      bottom: "0px",
      left: "0px"
    };

    return (
      <div>
        <Card
          className="card text-center"
          key={todo.key}
          style={
            ({ width: "18em" },
            { height: "12em" },
            { backgroundColor: todo.bodyColor })
          }
        >
          <Card.Header
            className="category header"
            style={todo.category != "" ? {} : { display: "none" }}
          >
            {todo.category}
          </Card.Header>
          <Card.Body className="card-body">
            {" "}
            <Card.Title className={this.changeCardTitle()} type="text">
              {todo.text}
            </Card.Title>
            <Button
              variant="outline-primary"
              size="sm"
              onClick={this.toggleTodo}
            >
              Done
            </Button>{" "}
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => {
                this.deleteTodoItem(todo.key);
              }}
            >
              Delete
            </Button>{" "}
            <h4
              className="menu-card"
              variant="outline-primary"
              size="sm"
              onClick={this.handleClick}
            >
              :
            </h4>
            {this.state.displayColorPicker ? (
              <div style={popover}>
                <div style={cover} onClick={this.handleClose} />
                <TwitterPicker
                  triangle="hide"
                  color={this.state.background}
                  onChangeComplete={this.handleChangeComplete}
                />
              </div>
            ) : null}
          </Card.Body>
        </Card>
      </div>
    );
  }
  /**
   * body color operations
   */
  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  handleChangeComplete = color => {
    console.log("Previous color", this.state.background);
    this.setState({ background: color.hex });
    this.colorChange(this.state.background);
  };

  colorChange = () => {
    this.props.changeCardColorFn(this.props.todo, this.state.background);
  };

  /**
   * rest of things
   */
  toggleTodo = () => {
    console.log("pressed");
    this.props.updateTodoFn(this.props.todo);
  };

  deleteTodoItem = key => {
    console.log("asked for deletion");
    this.props.deleteTodoFn(key);
  };

  changeCardTitle() {
    let classes = "todoItem";
    classes += this.props.todo.completed ? " completed" : "";
    return classes;
  }
}

export default ToDoItem;
