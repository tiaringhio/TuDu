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
        key: ""
      }
    };
  }
  render() {
    return (
      <div className="row h-100">
        <div className="col-sm-12 my-auto">
          <div className="col-lg-4 col-lg-offset-4"></div>
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
                    this.handleInput(e);
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

  handleInput = e => {
    this.setState({
      currentItem: {
        text: e.target.value,
        completed: false,
        key: Date.now()
      }
    });
  };

  submitTodo = e => {
    this.props.addTodo(this.state.currentItem);
    document.getElementById("addTodoInput").value = "";
  };
}

export default AddToDo;
