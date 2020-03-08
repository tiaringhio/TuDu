import React, { Component } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";

class AddToDo extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      currentItem: {
        text: "",
        key: "",
        category: "",
        bodyColor: ""
      }
    };
  }
  render() {
    return (
      <div className="row h-100">
        <div className="col-sm-12 my-auto">
          <div className="w-25 mx-auto">
            <div className="input-group mb-3">
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="New Task"
                  aria-label="New Task"
                  aria-describedby="basic-addon2"
                  value={this.props.currentItem}
                  id={"addTodoInput"}
                  onChange={e => {
                    this.getElement(e);
                  }}
                />
                <InputGroup.Append>
                  <Button
                    variant="outline-secondary"
                    id="Submit button"
                    onClick={e => {
                      this.submitTodo(e);
                    }}
                  >
                    Add Task
                  </Button>
                </InputGroup.Append>
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
    this.setState({
      currentItem: {
        text: newWord,
        completed: false,
        key: Date.now(),
        category: newDecorator,
        bodyColor: ""
      }
    });
  };

  submitTodo = e => {
    this.props.addTodo(this.state.currentItem);
    document.getElementById("addTodoInput").value = "";
  };
}

export default AddToDo;
