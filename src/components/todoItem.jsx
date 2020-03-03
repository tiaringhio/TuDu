import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import "./todoItem.css";
import { TwitterPicker } from "react-color";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faPalette } from "@fortawesome/free-solid-svg-icons";

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
      top: "10px",
      right: "10px",
      bottom: "10px",
      left: "10px"
    };

    return (
      <div classes="card-container">
        <Card
          className="cardItem"
          key={todo.key}
          style={
            ({ width: "18em" },
            { height: "12em" },
            { backgroundColor: todo.bodyColor })
          }
        >
          <Card.Header
            className="category-header"
            style={todo.category != "" ? {} : { display: "none" }}
          >
            {todo.category}
          </Card.Header>
          <Card.Body className="card-body">
            {" "}
            <Card.Title
              className={this.changeCardTitle()}
              onClick={this.toggleTodo}
              type="text"
            >
              {todo.text}
            </Card.Title>
            <span>
              <FontAwesomeIcon
                className="delete-icon"
                color="#707070"
                icon={faTrash}
                onClick={() => {
                  this.deleteTodoItem(todo.key);
                }}
              />
            </span>
            <FontAwesomeIcon
              className="complete-icon"
              color="#707070"
              icon={faCheck}
              onClick={this.toggleTodo}
            />
            <FontAwesomeIcon
              className="palette-icon"
              color="#707070"
              icon={faPalette}
              onClick={this.handleClick}
            />
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
    this.props.updateTodoFn(this.props.todo);
  };

  deleteTodoItem = key => {
    this.props.deleteTodoFn(key);
  };

  changeCardTitle() {
    let classes = "todoItem";
    classes += this.props.todo.completed ? " strike" : "";
    return classes;
  }
}

export default ToDoItem;
