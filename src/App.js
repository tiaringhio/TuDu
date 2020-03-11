import React, { Component, useContext } from "react";
import Header from "./components/header";
import ToDoList from "./components/todolist";
import AddToDo from "./components/addTodo";
import SplashScreen from "./components/splashScreen";
import app from "./firebaseConfig.js";

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
        bodyColor: "#2962ff",
        date: ""
      },
      uid: ""
    };
    this.addTodo = this.addTodo.bind(this);
    this.changeColor = this.changeColor.bind(this);
    this.changeDate = this.changeDate.bind(this);
  }

  componentWillMount = () => {
    app.auth().onAuthStateChanged(user => {
      this.setState({ uid: user.uid });
      app
        .firestore()
        .collection("users")
        .doc(this.state.uid)
        .collection("user_todos")
        .get()
        .then(querySnapshot => {
          const data = querySnapshot.docs.map(doc => doc.data());
          this.setState({ todos: data });
        });
    });
  };

  addTodo = async todo => {
    app
      .firestore()
      .collection("users")
      .doc(this.state.uid)
      .collection("user_todos")
      .doc(todo.key.toString())
      .set(todo)
      .then(function() {
        console.log("element added");
      })
      .catch(function(error) {
        console.error("error adding document", error);
      });
    await this.setState({
      todos: [...this.state.todos, todo],
      currentItem: {
        text: "",
        completed: false,
        key: "",
        category: "",
        bodyColor: "#2962ff",
        date: ""
      }
    });
  };

  changeColor = async (todo, color) => {
    app
      .firestore()
      .collection("users")
      .doc(this.state.uid)
      .collection("user_todos")
      .doc(todo.key.toString())
      .update({
        bodyColor: color
      })
      .then(function() {
        console.log("color updated");
      })
      .catch(function(error) {
        console.error("error when updating color", error);
      });
    const newColor = this.state.todos.map(_todo => {
      if (todo === _todo) {
        return {
          text: todo.text,
          completed: todo.completed,
          key: _todo.key,
          category: _todo.category,
          bodyColor: color,
          date: todo.date
        };
      } else {
        return _todo;
      }
    });
    await this.setState({ todos: newColor });
  };

  updateTodo = async todo => {
    app
      .firestore()
      .collection("users")
      .doc(this.state.uid)
      .collection("user_todos")
      .doc(todo.key.toString())
      .update({
        completed: !todo.completed
      })
      .then(function() {
        console.log("element updated");
      })
      .catch(function(error) {
        console.error("error updating element", error);
      });
    const newTodos = this.state.todos.map(_todo => {
      if (todo === _todo) {
        return {
          text: todo.text,
          completed: !todo.completed,
          key: _todo.key,
          category: _todo.category,
          bodyColor: _todo.bodyColor,
          date: _todo.date
        };
      } else {
        return _todo;
      }
    });
    await this.setState({ todos: newTodos });
  };

  changeDate = async (todo, date) => {
    app
      .firestore()
      .collection("users")
      .doc(this.state.uid)
      .collection("user_todos")
      .doc(todo.key.toString())
      .update({
        date: date
      })
      .then(function() {
        console.log("element updated");
      })
      .catch(function(error) {
        console.error("error updating element", error);
      });
    const newDate = this.state.todos.map(_todo => {
      if (todo === _todo) {
        return {
          text: todo.text,
          completed: todo.completed,
          key: _todo.key,
          category: _todo.category,
          bodyColor: todo.bodyColor,
          date: date
        };
      } else {
        return _todo;
      }
    });
    await this.setState({ todos: newDate });
  };

  deleteTodo = async key => {
    app
      .firestore()
      .collection("users")
      .doc(this.state.uid)
      .collection("user_todos")
      .doc(key.toString())
      .delete()
      .then(function() {
        console.log("element deleted");
      })
      .catch(function(error) {
        console.error("Error removing document: ", error);
      });
    const filteredTodos = this.state.todos.filter(todo => todo.key !== key);
    await this.setState({ todos: filteredTodos });
    console.log(this.state.todos);
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
          changeDateFn={this.changeDate}
        />
      </div>
    );
  }
}

export default App;
