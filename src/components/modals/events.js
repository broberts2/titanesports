import React, { Component } from "react";
import Modal from "react-awesome-modal";
import { AwesomeButton } from "react-awesome-button";
import BigCalendar from "react-big-calendar";
import Loader from "./loader";
import moment from "moment";

export default class Events extends Component {
  render() {
    const localizer = BigCalendar.momentLocalizer(moment);
    const MyCalendar = props => (
      <div className={"calendar"}>
        <BigCalendar
          onSelectEvent={e => this.props.actions.setEvent(e)}
          views={["month", "day"]}
          localizer={localizer}
          events={this.props.state.events}
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
            <div className={"video"}>
              <video key={""} muted={true} preload="auto" loop autoPlay>
                <source
                  src={require("../../webm/animated-shurima.webm")}
                  type={"video/webm"}
                />
              </video>
            </div>
            {this.props.state.loading ? <Loader /> : <MyCalendar />}
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
