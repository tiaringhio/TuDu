import React, { Component } from "react";
import Header from "./components/header";
import ToDoList from "./components/todolist";
import AddToDo from "./components/addTodo";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      currentItem: {
        text: "",
        completed: false,
        key: "",
        category: ""
      }
    };
    this.addTodo = this.addTodo.bind(this);
    this.changeDecorator = this.changeDecorator.bind(this);
  }

  componentDidMount = () => {
    const todos = localStorage.getItem("todos");
    if (todos) {
      const savedTodos = JSON.parse(todos);
      this.setState({ todos: savedTodos });
    } else {
      console.log("No todos");
    }
  };

  // TODO: This could be used to store the color TODO
  changeDecorator = async decorator => {
    await this.setState({
      decorator: {
        color: decorator
      }
    });
    localStorage.setItem("decorator", JSON.stringify(this.state.decorator));
    console.log("Decorators in storage", localStorage.getItem("decorator"));
  };

  addTodo = async todo => {
    await this.setState({
      todos: [...this.state.todos, todo],
      currentItem: {
        text: "",
        completed: false,
        key: "",
        category: ""
      }
    });
    localStorage.setItem("todos", JSON.stringify(this.state.todos));
    console.log("Todos in storage", localStorage.getItem("todos"));
  };

  updateTodo = async todo => {
    const newTodos = this.state.todos.map(_todo => {
      if (todo === _todo) {
        return {
          text: todo.text,
          completed: !todo.completed,
          key: _todo.key,
          category: _todo.category
        };
      } else {
        return _todo;
      }
    });
    await this.setState({ todos: newTodos });
    localStorage.setItem("todos", JSON.stringify(this.state.todos));
    console.log(newTodos);
  };

  deleteTodo = async key => {
    const filteredTodos = this.state.todos.filter(todo => todo.key !== key);
    await this.setState({ todos: filteredTodos });
    console.log(this.state.todos);
    localStorage.setItem("todos", JSON.stringify(this.state.todos));
  };

  render() {
    return (
      <div>
        <Header />
        <AddToDo addTodo={this.addTodo} />
        <ToDoList
          handleInput={this.handleInput}
          todos={this.state.todos}
          currentItem={this.state.currentItem}
          updateTodoFn={this.updateTodo}
          deleteTodoFn={this.deleteTodo}
          changeDecorator={this.changeDecorator}
        />
      </div>
    );
  }
}

export default App;
