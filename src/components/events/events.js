import React from "react";
import { connect } from "react-redux";
import Components from "../../components";
import Calendar from "react-calendar";
import moment from "moment";
import "./events.css";

import Api from "../../Api";

const parseDate = date => {
  return moment(date)
    .format("MMM Do, YYYY")
    .toString();
};

const list = {
  "0": <img src={require("./img/0.png")} />,
  "1": <img src={require("./img/1.png")} />,
  "2": <img src={require("./img/2.png")} />,
  "3": <img src={require("./img/3.png")} />,
  "4": <img src={require("./img/4.png")} />,
  "5": <img src={require("./img/5.png")} />,
  "6": <img src={require("./img/6.png")} />,
  "7": <img src={require("./img/7.png")} />,
  "8": <img src={require("./img/8.png")} />,
  "9": <img src={require("./img/9.png")} />,
  "10": <img src={require("./img/10.png")} />,
  "11": <img src={require("./img/11.png")} />,
  "12": <img src={require("./img/12.png")} />,
  "13": <img src={require("./img/13.png")} />
};

class EventViewer extends React.Component {
  state = {
    events: [],
    newEvent: {
      text: "",
      time: ""
    },
    title: "",
    selectedIcon: 0
  };

  componentDidMount() {
    this.setState({
      events: this.props.events,
      title: this.props.title,
      selectedIcon: this.props.icon
    });
  }

  removeEvent(index) {
    this.setState({
      events: this.state.events.filter((el, i) => (index === i ? null : el))
    });
  }

  addEvent() {
    let events = this.state.events;
    events.push(this.state.newEvent);
    this.setState({
      events,
      newEvent: {
        text: "",
        time: ""
      }
    });
  }

  componentDidUpdate(newProps) {
    if (this.props.events !== newProps.events) {
      this.setState({
        events: this.props.events,
        title: this.props.title,
        selectedIcon: this.props.icon
      });
    }
  }

  setIcon(selectedIcon) {
    this.setState({ selectedIcon });
  }

  render() {
    return (
      <div className={"event-viewer"}>
        <table width="100%">
          <tbody>
            <tr>
              <td>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        {this.props.canEdit ? (
                          <div>
                            <input
                              placeholder={"Title"}
                              style={{
                                marginLeft: "10px",
                                fontSize: "16px",
                                width: "50%"
                              }}
                              value={this.state.title}
                              onChange={e => {
                                this.setState({ title: e.target.value });
                              }}
                            />
                            <div className={"icon-row"}>
                              {Object.values(list).map((el, i) => (
                                <div
                                  style={{ display: "inline-flex" }}
                                  onClick={() => this.setIcon(i)}
                                >
                                  {el}
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <h1>{this.state.title}</h1>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h2>
                          {parseDate(this.props.date) === "Invalid date"
                            ? this.props.date
                            : parseDate(this.props.date)}{" "}
                          EST
                        </h2>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td align="right">
                <div className={"img"}>{list[this.state.selectedIcon]}</div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className={"items"}>
          <div>
            <table width="100%">
              <tbody>
                {this.state.events.map((el, i) => (
                  <tr>
                    <td width="15%">
                      <i
                        className={"far fa-calendar-alt"}
                        style={{ pointerEvents: "none" }}
                      ></i>
                    </td>
                    <td>
                      <div className={"item"} key={i}>
                        {this.props.canEdit ? (
                          <div>
                            <input
                              placeholder={"Event"}
                              value={this.state.events[i].text}
                              onChange={e => {
                                let events = this.state.events;
                                events[i].text = e.target.value;
                                this.setState({ events });
                              }}
                            />
                            <input
                              placeholder={"Time"}
                              style={{ marginLeft: "10px", fontSize: "16px" }}
                              value={this.state.events[i].time}
                              onChange={e => {
                                let events = this.state.events;
                                events[i].time = e.target.value;
                                this.setState({ events });
                              }}
                            />
                          </div>
                        ) : (
                          <div>
                            <h2>{this.state.events[i].time}</h2>
                            <h3>{this.state.events[i].text}</h3>
                          </div>
                        )}
                        {this.props.canEdit ? (
                          <div className={"btns"}>
                            <i
                              onClick={() => this.removeEvent(i)}
                              className={"fas fa-window-close"}
                            ></i>
                          </div>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {this.props.canEdit ? (
              <div className={"item"}>
                <input
                  placeholder={"Event"}
                  value={this.state.newEvent.text}
                  onChange={e => {
                    let newEvent = this.state.newEvent;
                    newEvent.text = e.target.value;
                    this.setState({ newEvent });
                  }}
                />
                <input
                  placeholder={"Time"}
                  style={{ marginLeft: "10px", fontSize: "16px" }}
                  value={this.state.newEvent.time}
                  onChange={e => {
                    let newEvent = this.state.newEvent;
                    newEvent.time = e.target.value;
                    this.setState({ newEvent });
                  }}
                />
                <div className={"btns"}>
                  <i
                    onClick={() => this.addEvent()}
                    className={"fas fa-plus-square"}
                  ></i>
                </div>
              </div>
            ) : null}
            {this.props.canEdit &&
            !(this.props.isNewEvent && this.state.events.length <= 0) ? (
              <button
                style={
                  this.state.events.length >= 0
                    ? {}
                    : {
                        pointerEvents: "none",
                        opacity: "0.3"
                      }
                }
                onClick={async () => {
                  if (this.state.events.length < 1) {
                    await this.props.startRequest(
                      Api.removeEvent({
                        date: this.props.date
                      })
                    );
                  } else if (this.props.isNewEvent) {
                    await this.props.startRequest(
                      Api.createEvent({
                        date: this.props.date,
                        title: this.state.title,
                        events: this.state.events,
                        icon: this.state.selectedIcon
                      })
                    );
                  } else {
                    await this.props.startRequest(
                      Api.updateEvent({
                        date: this.props.date,
                        title: this.state.title,
                        events: this.state.events,
                        icon: this.state.selectedIcon
                      })
                    );
                  }
                  this.props.update();
                }}
              >
                {this.state.events.length < 1
                  ? "Remove Event"
                  : this.props.isNewEvent
                  ? "Create Event"
                  : "Update Event"}
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

class Content extends React.Component {
  render() {
    const items = 2;
    let icon_id = null;
    let events = {
      events: []
    };
    for (let i = 0; i < this.props.events.length; i++) {
      if (this.props.events[i].date === parseDate(this.props.date)) {
        events = {
          title: this.props.events[i].title,
          events: this.props.events[i].events
        };
        icon_id = this.props.events[i].icon;
        break;
      }
    }
    return (
      <div className={"sub-tile"}>
        {icon_id !== null ? <div className={"img"}>{list[icon_id]}</div> : null}
        {this.props.activeDate === this.props.date ? (
          <i className={"fas fa-search search"}></i>
        ) : null}
        <div className={"title"}>
          <h4>{events.title}</h4>
        </div>
        {events.events.map((el, i) => {
          if (i < items) {
            return (
              <div key={i} className={"listing"}>
                <p>{el.time}</p>
                <p>{el.text}</p>
              </div>
            );
          } else if (i === items) {
            return <div key={i} className={"listing"}></div>;
          } else {
            return null;
          }
        })}
      </div>
    );
  }
}

class Events extends React.Component {
  state = {
    canEdit: false,
    domMounted: false,
    modalVisible: false,
    modalSize: {
      width: "750px",
      height: "75%"
    },
    date: new Date(),
    nowDate: new Date(),
    events: []
  };

  changeDate(date) {
    this.setState({ date });
  }

  async getEvents() {
    const user = await Api.validateToken();
    const events = await Api.getEvents();
    this.setState({
      events: events.events,
      domMounted: true,
      canEdit: user.code === 200 && user.l < 3,
      modalSize:
        user.code === 200 && user.l < 3
          ? {
              width: "75%",
              height: "75%"
            }
          : this.state.modalSize
    });
  }

  componentDidMount() {
    this.getEvents();
  }

  openModal(modal, size) {
    this.setState({ modalVisible: false, modal, modalSize: size });
    setTimeout(() => this.setState({ modalVisible: true }), 250);
  }

  setModal(modalVisible) {
    this.setState({ modalVisible });
  }

  render() {
    return (
      <div className={"events"}>
        <Components.Loader domMounted={this.state.domMounted}>
          <Components.Header
            openModal={() => this.openModal(<Components.Login />)}
          />
          <Components.Modal
            width={this.state.modalSize.width}
            height={this.state.modalSize.height}
            openModal={modal =>
              this.openModal(modal, {
                width: "45%",
                height: "75%"
              })
            }
            setModal={modalVisible => this.setModal(modalVisible)}
            visible={this.state.modalVisible}
          >
            {this.state.modal}
          </Components.Modal>
          <div className={"body"}>
            <div className={"calendar"}>
              <div className={"container"}>
                <div className={"video"}>
                  <video muted preload="auto" loop autoPlay>
                    <source src={require(`./vid.mp4`)} type={"video/mp4"} />
                  </video>
                </div>
                <Calendar
                  calendarType={"US"}
                  onClickDay={date => {
                    if (
                      parseDate(this.state.date) === parseDate(date) ||
                      true
                    ) {
                      const events = this.state.events.filter(el =>
                        el.date === parseDate(date) ? el : null
                      );
                      if (events[0] || this.state.canEdit) {
                        this.openModal(
                          <EventViewer
                            update={() => this.getEvents()}
                            isNewEvent={!events[0]}
                            events={events[0] ? events[0].events : []}
                            date={events[0] ? events[0].date : date}
                            title={events[0] ? events[0].title : ""}
                            canEdit={this.state.canEdit}
                            icon={events[0] ? events[0].icon : 0}
                          />,
                          this.state.modalSize
                        );
                      }
                    }
                    this.setState({ date });
                  }}
                  tileClassName={e =>
                    `tile ${
                      e.date <= moment(this.state.nowDate).subtract(1, "days")
                        ? "dun"
                        : "std"
                    } ${
                      e.date.getDate().toString() ===
                      this.state.nowDate.getDate().toString()
                        ? "active"
                        : ""
                    }`
                  }
                  tileContent={e => (
                    <Content
                      canEdit={this.state.canEdit}
                      activeDate={this.state.date}
                      date={e.date}
                      events={this.state.events}
                      openModal={modal =>
                        this.openModal(modal, this.state.modalSize)
                      }
                    />
                  )}
                  className={"body"}
                  onChange={this.onChange}
                  value={this.state.nowDate}
                />
              </div>
            </div>
          </div>
          <Components.Footer />
        </Components.Loader>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Events);
