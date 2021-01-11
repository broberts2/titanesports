import React from "react";
import styled from "styled-components";
import { Transition, Img } from "arclight-react";

const FlipCard = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 1000;
`;

const Wrapper = styled.div`
  padding: 5px;
  border: 2px solid ${(props) => (props.lta === 1 ? "#00baff" : "#b90048")};
  border-radius: 4px;
`;

export default class _ extends React.Component {
  state = { slideDuration: 1, delay: 1.25 };

  render() {
    return this.props.STATE.flipCardImg ? (
      <FlipCard>
        <Transition
          trans={{
            animation: "flipInY",
            duration: this.state.slideDuration,
          }}
        >
          <Transition
            trans={{
              animation: "flipOutY",
              duration: this.state.slideDuration,
              delay: this.state.slideDuration + this.state.delay,
            }}
          >
            <Wrapper lta={this.props.STATE.actionTeam}>
              <Img
                src={
                  this.props.STATE.ENDPOINT +
                  "/dragontail/" +
                  this.props.STATE.flipCardImg
                }
              />
            </Wrapper>
          </Transition>
        </Transition>
      </FlipCard>
    ) : null;
  }
}
