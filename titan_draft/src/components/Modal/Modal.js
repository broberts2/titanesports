import React from "react";
import styled from "styled-components";
import { Modal, Particles } from "arclight-react";
import Select from "./Select/Select";
import Replay from "./Replay/Replay";

export default class _ extends React.Component {
  render() {
    return (
      <Modal
        theme={this.props.STATE.draftData.THEME}
        visible={this.props.STATE.modalVisible}
        disableClickAway
      >
        {this.props.STATE.draftData.EVENTS_LOG.length < 20 ? (
          <Select STATE={this.props.STATE} />
        ) : (
          <Replay STATE={this.props.STATE} />
        )}
      </Modal>
    );
  }
}
