import React, { Component } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./addTodo.css";

class AddToDo extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      currentItem: {
        text: "",
        key: "",
        category: "",
        bodyColor: "#FCB900",
        date: ""
      }
    };
  }

  keyPress(e) {
    if (e.keyCode == 13) {
      this.submitTodo(e);
    }
  }
  render() {
    return (
      <div className="row h-100 padding-for-input">
        <div className="col-sm-12 my-auto">
          <div className="w-25 mx-auto">
            <div className="input-group mb-3 ">
              <InputGroup className="mb-3 shadow inputItem">
                <FormControl
                  placeholder="New Task"
                  aria-label="New Task"
                  aria-describedby="basic-addon2"
                  value={this.props.currentItem}
                  id={"addTodoInput"}
                  onKeyDown={e => {
                    this.keyPress(e);
                  }}
                  onChange={e => {
                    this.getElement(e);
                  }}
                />
                <FontAwesomeIcon
                  className="add-icon"
                  color="#000000"
                  icon={faPlus}
                  onClick={e => {
                    this.submitTodo(e);
                  }}
                />
              </InputGroup>
            </div>
          </div>
        </div>
      </div>
    );
  }

  getElement = e => {
    let target = e.target.value;
    let dataBefore = [];
    let dataAfter = [];
    let newWord = [];
    let newDecorator = [];
    let i = 0;
    for (i = 0; i < target.length && target[i] != "#"; i++) {
      dataBefore.push(target[i]);
      newWord = dataBefore.join("");
    }
    if (target[i] === "#") {
      for (let j = i + 1; j < target.length; j++) {
        dataAfter.push(target[j]);
        newDecorator = dataAfter.join("");
      }
    }
    if (newWord !== "" && newWord !== " ") {
      this.setState({
        currentItem: {
          text: newWord,
          completed: false,
          key: Date.now(),
          category: newDecorator,
          bodyColor: "#2962ff",
          date: ""
        }
      });
    } else {
      this.setState({ text: "" });
    }
  };

  submitTodo = e => {
    this.props.addTodo(this.state.currentItem);
    document.getElementById("addTodoInput").value = "";
  };
}

export default AddToDo;
