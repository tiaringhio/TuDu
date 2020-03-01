import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./todoItem.css";
import ColorSelector from "../components/colorSelector";

class ToDoItem extends Component {
  render() {
    const { todo } = this.props;
    const { decorator } = this.props;
    return (
      <div>
        <Card
          className="card text-center"
          key={todo.key}
          style={({ width: "18em" }, { height: "12em" })}
        >
          <Card.Header
            className="category header"
            style={todo.category != "" ? {} : { display: "none" }}
          >
            {todo.category}
          </Card.Header>
          <Card.Body className={this.changeCardColor}>
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
          </Card.Body>
        </Card>
      </div>
    );
  }

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
  // TODO: Color selector
  changeCardColor() {
    let classes = "card text-centeritemBody";
    classes += this.props.decorator.color ? " bg-secondary " : "";
    return classes;
  }
}

export default ToDoItem;
