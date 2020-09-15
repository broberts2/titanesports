import React from "react";
import styled from "styled-components";
import { Modal, Particles } from "arclight-react";
import Select from "./Select/Select";

export default class _ extends React.Component {
  render() {
    return (
      <Modal
        theme={"Dark"}
        visible={this.props.STATE.modalVisible}
        disableClickAway
        crown={{
          position: "right",
          constrain: false,
          content: (
            <div>
              <img src={require("../../config/assets/spirit-flower.png")} />
              <div style={{ position: "absolute", top: -55, left: -55 }}>
                <Particles
                  width={300}
                  height={300}
                  animations={[
                    {
                      name: "spiritual",
                      particleColor: "#00fff0",
                      x: 50,
                      y: 50,
                    },
                  ]}
                  invoke={false}
                />
              </div>
            </div>
          ),
        }}
        setVisible={(a) => this.props.STATE.setModalStatus(a)}
      >
        <Select STATE={this.props.STATE} />
      </Modal>
    );
  }
}
