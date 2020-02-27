import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import ToDoItem from "../components/todoItem";

class ToDoList extends Component {
  render() {
    const { todos } = this.props;

    return (
      <div className="row h-100">
        <div className="col-sm-12 my-auto">
          <div className="w-25 mx-auto">
            <Container className="p-3">
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
            </Container>
          </div>
        </div>
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
