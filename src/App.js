import React, { Component, useContext } from "react";
import Header from "./components/header";
import ToDoList from "./components/todolist";
import AddToDo from "./components/addTodo";
import SplashScreen from "./components/splashScreen";
import * as firebase from "firebase";

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
        bodyColor: "",
        documentID: ""
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
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const sessionUID = user.uid;
        const newDocumentName = todo.key.toString();
        console.log(sessionUID);
        console.log(newDocumentName);
        firebase
          .firestore()
          .collection("users")
          .doc(sessionUID)
          .collection("user_todos")
          .doc(newDocumentName)
          .set(todo)
          .then(function() {
            console.log("element added");
          })
          .catch(function(error) {
            console.error("error adding document", error);
          });
      }
    });
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
  };

  changeColor = async (todo, color) => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const sessionUID = user.uid;
        const elementToChangeColor = todo.key.toString();
        console.log(elementToChangeColor);
        firebase
          .firestore()
          .collection("users")
          .doc(sessionUID)
          .collection("user_todos")
          .doc(elementToChangeColor)
          .update({
            bodyColor: color
          })
          .then(function() {
            console.log("color updated");
          })
          .catch(function(error) {
            console.error("error when updating color", error);
          });
      }
    });
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
  };

  updateTodo = async todo => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const sessionUID = user.uid;
        const elementoToUpdate = todo.key.toString();
        console.log(elementoToUpdate);
        firebase
          .firestore()
          .collection("users")
          .doc(sessionUID)
          .collection("user_todos")
          .doc(elementoToUpdate)
          .update({
            completed: !todo.completed
          })
          .then(function() {
            console.log("element updated");
          })
          .catch(function(error) {
            console.error("error updating element", error);
          });
      }
    });
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
  };

  deleteTodo = async key => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const sessionUID = user.uid;
        const elementoToDelete = key.toString();
        console.log(elementoToDelete);
        firebase
          .firestore()
          .collection("users")
          .doc(sessionUID)
          .collection("user_todos")
          .doc(elementoToDelete)
          .delete()
          .then(function() {
            console.log("element deleted");
          })
          .catch(function(error) {
            console.error("Error removing document: ", error);
          });
      }
    });
    const filteredTodos = this.state.todos.filter(todo => todo.key !== key);
    await this.setState({ todos: filteredTodos });
    console.log(this.state.todos);
    localStorage.setItem("todos", JSON.stringify(this.state.todos));
  };

  render() {
    return (
      <div>
        <Header />
        <SplashScreen />
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
