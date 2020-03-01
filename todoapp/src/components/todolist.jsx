import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import ToDoItem from "../components/todoItem";
import CardColumns from "react-bootstrap/CardColumns";

class ToDoList extends Component {
  render() {
    const { todos } = this.props;

    return (
      <div>
        <Container className="container-fluid">
          <CardColumns>
            {todos.map(_todo => {
              return (
                <ToDoItem
                  key={_todo.key}
                  todo={_todo}
                  updateTodoFn={this.updateTodo}
                  deleteTodoFn={() => {
                    this.deleteTodoList(_todo.key);
                  }}
                ></ToDoItem>
              );
            })}
          </CardColumns>
        </Container>
      </div>
    );
  }

  updateTodo = todo => {
    this.props.updateTodoFn(todo);
  };

  deleteTodoList = key => {
    this.props.deleteTodoFn(key);
  };
}

export default ToDoList;
