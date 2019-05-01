import React, { Component } from "react";
import Modal from "react-awesome-modal";
import { AwesomeButton } from "react-awesome-button";
import BigCalendar from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";

export default class Events extends Component {
  state = {
    events: [
      {
        start: new Date(),
        end: new Date(moment().add(1, "hours")),
        title: "Some title"
      },
      {
        start: new Date(moment().add(3, "hours")),
        end: new Date(moment().add(4, "hours")),
        title: "Some title"
      },
      {
        start: new Date(moment().add(5, "hours")),
        end: new Date(moment().add(6, "hours")),
        title: "Some title"
      },
      {
        start: new Date(moment().add(7, "hours")),
        end: new Date(moment().add(8, "hours")),
        title: "Some title"
      },
      {
        start: new Date(moment().add(9, "hours")),
        end: new Date(moment().add(10, "hours")),
        title: "Some title"
      }
    ]
  };
  render() {
    const localizer = BigCalendar.momentLocalizer(moment);
    const MyCalendar = props => (
      <div className={"calendar"}>
        <BigCalendar
          localizer={localizer}
          events={this.state.events}
          startAccessor="start"
          endAccessor="end"
        />
      </div>
    );
    return (
      <Modal
        visible={this.props.state.modal === this.props.index ? true : false}
        width={"75%"}
        height={"90%"}
        effect={"fadeInUp"}
        onClickAway={() => this.props.actions.closeModal()}
      >
        <div className={"modal-style"}>
          <div className={"events"}>
            <MyCalendar />
            <div className={"button"}>
              <div
                className="linkButton"
                onClick={() => this.props.actions.closeModal()}
              >
                close
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}
