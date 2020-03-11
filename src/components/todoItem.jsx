import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import "./todoItem.css";
import { TwitterPicker } from "react-color";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faPalette } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import Moment from "react-moment";

class ToDoItem extends Component {
  state = {
    displayColorPicker: false,
    displayDatePicker: false,
    background: "#FCB900",
    date: new Date()
  };

  render() {
    const { todo } = this.props;

    const popover = {
      position: "absolute",
      zIndex: "2"
    };

    const cover = {
      position: "fixed",
      top: "10px",
      right: "10px",
      bottom: "10px",
      left: "10px"
    };
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div classes="card-container">
          <Card
            text="white"
            className="cardItem"
            key={todo.key}
            style={
              ({ width: "18em" },
              { height: "12em" },
              { backgroundColor: todo.bodyColor })
            }
          >
            <Card.Header
              className="category-header"
              style={todo.category != "" ? {} : { display: "none" }}
            >
              {todo.category}
            </Card.Header>
            <Card.Body className="card-body">
              {" "}
              <Card.Title
                className={this.changeCardTitle()}
                onClick={this.toggleTodo}
                type="text"
              >
                {todo.text}
              </Card.Title>
              <Moment className="todo-date" format="DD/MM/YY">
                {todo.date}
              </Moment>
              <FontAwesomeIcon
                className="delete-icon"
                color="#eeeeee"
                icon={faTrash}
                onClick={() => {
                  this.deleteTodoItem(todo.key);
                }}
              />
              <FontAwesomeIcon
                className="complete-icon"
                color="#eeeeee"
                icon={faCheck}
                onClick={this.toggleTodo}
              />
              <FontAwesomeIcon
                className="palette-icon"
                color="#eeeeee"
                icon={faPalette}
                onClick={this.handleClick}
              />
              <FontAwesomeIcon
                className="clock-icon"
                color="#eeeeee"
                icon={faClock}
                onClick={this.displayDatePicker}
              />
              {this.state.displayColorPicker ? (
                <div style={popover}>
                  <div style={cover} onClick={this.handleClose} />
                  <TwitterPicker
                    triangle="hide"
                    color={this.state.background}
                    onChangeComplete={this.handleChangeComplete}
                  />
                </div>
              ) : null}
              {this.state.displayDatePicker == true ? (
                <Grid
                  container
                  justify="space-around"
                  onClick={this.handleClose}
                >
                  <KeyboardDatePicker
                    autoOk={true}
                    disablePast={true}
                    margin="normal"
                    id="date-picker-dialog"
                    label="Date picker dialog"
                    format="dd/MM/yy"
                    value={this.state.date}
                    onChange={date => this.setState({ date }, this.updateDate)}
                    KeyboardButtonProps={{
                      "aria-label": "change date"
                    }}
                  />
                </Grid>
              ) : null}
            </Card.Body>
          </Card>
        </div>
      </MuiPickersUtilsProvider>
    );
  }

  /**
   * body color operations
   */
  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  handleChangeComplete = color => {
    this.setState({ background: color.hex });
    this.colorChange(this.state.background);
  };

  colorChange = () => {
    this.props.changeCardColorFn(this.props.todo, this.state.background);
  };

  /**
   * date picker operations
   */
  displayDatePicker = () => {
    this.setState({ displayDatePicker: !this.state.displayDatePicker });
  };

  handleDateChange = date => {
    this.setState({
      date: date
    });
  };

  updateDate = () => {
    console.log("date to change: ", this.state.date);
    this.props.changeDateFn(this.props.todo, this.state.date);
  };

  /**
   * rest of things
   */
  toggleTodo = () => {
    this.props.updateTodoFn(this.props.todo);
  };

  deleteTodoItem = key => {
    this.props.deleteTodoFn(key);
  };

  changeCardTitle() {
    let classes = "todoItem";
    classes += this.props.todo.completed ? " strike" : "";
    return classes;
  }
}

export default ToDoItem;
