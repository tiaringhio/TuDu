import React, { Component } from "react";
import "./todolist.css";
import app from "../firebaseConfig";
import Container from "react-bootstrap/Container";
import ToDoItem from "../components/todoItem";
import CardColumns from "react-bootstrap/CardColumns";

class ToDoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      uid: ""
    };
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
                  changeDateFn={this.addDate}
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

  addDate = (todo, date) => {
    console.log("date received in list");
    this.props.changeDateFn(todo, date);
  };
}

export default ToDoList;
