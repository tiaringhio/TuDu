import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import "./todoItem.css";
import { TwitterPicker } from "react-color";
import DateFnsUtils from "@date-io/date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faCheck,
  faPalette,
  faClock,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import Moment from "react-moment";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import DatePicker from "react-datepicker";
import Modal from "react-bootstrap/Modal";
import "react-datepicker/dist/react-datepicker.css";

class ToDoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayColorPicker: false,
      background: "#FCB900",
      date: new Date(),
      isDatePickerOpen: false,
      displayRightDate: false,
      displayWrongDate: true
    };
  }

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

    this.componentWillMount = () => {
      this.setState({ displayRightDate: true });
    };

    this.componentDidMount = () => {
      this.changeDateTitle();
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
              {todo.date !== "" && this.state.displayWrongDate ? (
                /**
                 * This is probably not the correct way to tackle this task, it's a workaround,
                 * let me explain:
                 * what happens is that Firebase uses Timestamps to keep track of date values,
                 * the conversion is usually pretty simple (using moment even more so),
                 * the problem is that i cannot figure out why it shows invalid element
                 * when i change the value (doesn't do that anymore). So the workaround is
                 * to render contionally two different elements with different settings.
                 *
                 * Overenigneered but it works ¯\_(ツ)_/¯
                 */
                <div className={this.changeDateTitle()}>
                  <Moment className="todo-date" format="DD/MM/YY, HH:mm">
                    {todo.date.seconds * 1000}
                  </Moment>
                  <FontAwesomeIcon
                    className="delete-date-icon"
                    color="#eeeeee"
                    icon={faTimes}
                    onClick={() => this.setState({ date: "" }, this.deleteDate)}
                  />
                </div>
              ) : null}
              {this.state.displayRightDate ? (
                <div className={this.changeDateTitle()}>
                  <Moment className="todo-date" format="DD/MM/YY, HH:mm">
                    {todo.date}
                  </Moment>
                  <FontAwesomeIcon
                    className="delete-date-icon"
                    color="#eeeeee"
                    icon={faTimes}
                    onClick={() => this.setState({ date: "" }, this.deleteDate)}
                  />
                </div>
              ) : null}
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
                onClick={() => this.setState({ isDatePickerOpen: true })}
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
              <Modal
                centered
                show={this.state.isDatePickerOpen}
                // onHide={() => this.setState({ isDatePickerOpen: false })}
              >
                <DatePicker
                  className="date-style"
                  inline
                  showTimeSelect
                  minDate={new Date()}
                  onChange={date => this.setState({ date }, this.updateDate)}
                />{" "}
                <button
                  onClick={() => this.setState({ isDatePickerOpen: false })}
                  className="submit-date"
                >
                  Confirm
                </button>
              </Modal>
            </Card.Body>
          </Card>
        </div>
      </MuiPickersUtilsProvider>
    );
  }

  displayDateClose = () => {
    this.setState({ displayRightDate: false });
  };

  displayDateOpen = () => {
    this.setState({ displayRightDate: true });
  };

  showRightDate = () => {
    this.setState({
      displayRightDate: !this.state.displayRightDate,
      displayWrongDate: !this.state.displayWrongDate
    });
  };

  updateDate = () => {
    this.props.changeDateFn(this.props.todo, this.state.date);
    this.setState({
      displayRightDate: true,
      displayWrongDate: false
    });
  };

  deleteDate = () => {
    this.props.changeDateFn(this.props.todo, this.state.date);
    this.setState({
      displayRightDate: false,
      displayWrongDate: false
    });
  };

  changeDateTitle = () => {
    const date = new Date().getTime() / 1000;
    const firestoreDate = this.props.todo.date.seconds;
    if (firestoreDate <= date) {
      let classes = "dateContainer";
      classes += " expired";
      return classes;
    }
  };
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
