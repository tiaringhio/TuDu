import React, { Component } from "react";
import Header from "./components/header";
import ToDoList from "./components/todolist";
import AddToDo from "./components/addTodo";
import SplashScreen from "./components/splashScreen";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      currentItem: {
        text: "",
        completed: false,
        key: "",
        category: "",
        bodyColor: ""
      }
    };
    this.addTodo = this.addTodo.bind(this);
    this.changeColor = this.changeColor.bind(this);
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

  addTodo = async todo => {
    await this.setState({
      todos: [...this.state.todos, todo],
      currentItem: {
        text: "",
        completed: false,
        key: "",
        category: "",
        bodyColor: ""
      }
    });
    localStorage.setItem("todos", JSON.stringify(this.state.todos));
    console.log("Todos in storage", localStorage.getItem("todos"));
  };

  changeColor = async (todo, color) => {
    console.log("received color request", color);
    const newColor = this.state.todos.map(_todo => {
      if (todo === _todo) {
        return {
          text: todo.text,
          completed: todo.completed,
          key: _todo.key,
          category: _todo.category,
          bodyColor: color
        };
      } else {
        return _todo;
      }
    });
    await this.setState({ todos: newColor });
    localStorage.setItem("todos", JSON.stringify(this.state.todos));
    console.log("todo with new color", newColor);
    console.log("Todos in storage", localStorage.getItem("todos"));
  };

  updateTodo = async todo => {
    const newTodos = this.state.todos.map(_todo => {
      if (todo === _todo) {
        return {
          text: todo.text,
          completed: !todo.completed,
          key: _todo.key,
          category: _todo.category,
          bodyColor: _todo.bodyColor
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
        <SplashScreen />
        <Header />
        <AddToDo addTodo={this.addTodo} />
        <ToDoList
          handleInput={this.handleInput}
          todos={this.state.todos}
          currentItem={this.state.currentItem}
          updateTodoFn={this.updateTodo}
          deleteTodoFn={this.deleteTodo}
          changeColorFn={this.changeColor}
        />
      </div>
    );
  }
}

export default App;
