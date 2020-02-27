import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./todoItem.css";

class ToDoItem extends Component {
  render() {
    const { todo } = this.props;
    return (
      <div>
        <Card
          className="card text-center"
          key={todo.key}
          style={({ width: "18em" }, { height: "9em" })}
        >
          <Card.Body>
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
            </Button>
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
    let classes = "todoItem-";
    classes += this.props.todo.completed ? " completed" : "";
    return classes;
  }

  changeCardColor() {
    let classes = "card text-centeritemBody-";
    classes += this.props.todo.completed ? " bg-secondary " : "";
    return classes;
  }
}

export default ToDoItem;
