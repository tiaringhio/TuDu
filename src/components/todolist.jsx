import React, { Component } from "react";
import "./todolist.css";
import Container from "react-bootstrap/Container";
import ToDoItem from "../components/todoItem";
import CardColumns from "react-bootstrap/CardColumns";

class ToDoList extends Component {
  render() {
    const { todos } = this.props;

    return (
      <div>
        <Container className="container-fluid">
          <CardColumns className="card-columns">
            {todos.map(_todo => {
              return (
                <ToDoItem
                  key={_todo.key}
                  todo={_todo}
                  updateTodoFn={this.updateTodo}
                  deleteTodoFn={() => {
                    this.deleteTodoList(_todo.key);
                  }}
                  changeCardColorFn={this.changeCardColor}
                ></ToDoItem>
              );
            })}
          </CardColumns>
        </Container>
      </div>
    );
  }
  changeCardColor = (todo, color) => {
    this.props.changeColorFn(todo, color);
  };

  updateTodo = todo => {
    this.props.updateTodoFn(todo);
  };

  deleteTodoList = key => {
    this.props.deleteTodoFn(key);
  };
}

export default ToDoList;
