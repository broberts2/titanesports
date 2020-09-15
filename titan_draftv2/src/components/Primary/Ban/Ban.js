import React from "react";
import styled from "styled-components";
import { Transition } from "arclight-react";

const Ban = styled.div`
  width: 100%;
  position: relative;
  & img {
    top: 0;
    left: 0;
    position: absolute;
    border-radius: 50%;
  }
`;

const Text = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  font-weight: bold;
  font-style: italic;
  color: white;
  font-size: 0.75vw;
`;

export default class _ extends React.Component {
  state = { revealed: true };
  render() {
    return (
      
        <Transition
          trans={{
            animation: this.props.loadAnims.anim,
            delay: this.props.loadAnims.delay,
          }}
        >
          <Ban>
            {this.state.revealed ? (
              <React.Fragment>
                <img
                  src={require("./img/yone.jpg")}
                  width={"70%"}
                  style={{
                    paddingTop: "10%",
                    left: "68%",
                    transform: "translateX(-68%)",
                  }}
                />
                <img src={this.props.border} width={"100%"} />
                <img src={this.props.banLock} width={"25%"} />
                <Text>Heimerdinger</Text>
              </React.Fragment>
            ) : (
              <img src={this.props.banLock} width={"100%"} />
            )}
          </Ban>
        </Transition>
      
    );
  }
}
