import React, { Component } from "react";
import Modal from "react-awesome-modal";
import { AwesomeButton } from "react-awesome-button";
import Loader from "./loader";
import api from "../../utils/api";
import { position } from "../../img_router";
import ranksByNum from "../../utils/ranksByNum";

const config = require("../../config");

class CustomRow extends Component {
  render() {
    return (
      <tr onClick={() => this.props.action(this.props.members)}>
        <td align="center">
          <div style={{ width: "350px", textAlign: "left" }}>
            <img
              src={`${config.static_url}/${config.version}/img/profileicon/${this
                .props.iconId}.png`}
            />
            {this.props.name}
          </div>
        </td>
        <td />
        <td />
        <td align="center">{this.props.members.length}</td>
        <td align="center">{this.props.pr}</td>
      </tr>
    );
  }
}

export default class Teams extends Component {
  renderContent() {
    return (
      <div style={{ height: "150%" }}>
        <div className={"bar"}>
          <input style={{ width: "40%" }} type="text" placeholder="Team Name" />
        </div>
        <table>
          <tr>
            <th>Team Name</th>
            <th />
            <th />
            <th>Members</th>
            <th>Power Ranking</th>
          </tr>
        </table>
        <div className={"content"}>
          <table>
            <tbody>
              {this.props.state.teams.map(el => (
                <CustomRow
                  name={el.name}
                  iconId={el.iconId}
                  members={el.members}
                  subs={el.subs}
                  pr={el.pr}
                  action={async members => {
                    await this.props.actions.setUsersByTeam(members);
                    this.props.actions.setMenu(10);
                  }}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  render() {
    return (
      <Modal
        visible={this.props.state.modal === this.props.index ? true : false}
        width={"75%"}
        height={"90%"}
        effect={"fadeInUp"}
        onClickAway={() => this.props.actions.closeModal()}
      >
        <div className={"modal-style"}>
          <div className={"search"}>
            {this.props.state.loading ? <Loader /> : this.renderContent()}
            <div
              className={"back-button"}
              onClick={() => this.props.actions.closeModal()}
            >
              <i className="fas fa-arrow-alt-circle-left fa-3x" />
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}
