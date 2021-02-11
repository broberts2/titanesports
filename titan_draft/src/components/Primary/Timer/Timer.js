import React from "react";
import styled from "styled-components";
import { Timer, Transition } from "arclight-react";

const TIMER_SIZE = 100;

const _Timer = styled.div`
  position: absolute;
  z-index: 6;
  top: 50px;
  ${(props) => {
    switch (props.team_active) {
      case 0:
        return props.last_team_active === 1
          ? `left: ${TIMER_SIZE * 2}px`
          : `right: ${TIMER_SIZE * 2}px`;
      case 1:
        return `left: ${TIMER_SIZE * 2}px`;
      case 2:
        return `right: ${TIMER_SIZE * 2}px`;
    }
  }};
`;

export default class _ extends React.Component {
  grabTimerTrans(ta, lta) {
    switch (ta) {
      case 0:
        return lta === 1
          ? this.props.STATE.draftData.TIMER.LEFT_TRANSITION_OUT
          : this.props.STATE.draftData.TIMER.RIGHT_TRANSITION_OUT;
      case 1:
        return this.props.STATE.draftData.TIMER.LEFT_TRANSITION;
      case 2:
        return this.props.STATE.draftData.TIMER.RIGHT_TRANSITION;
    }
  }

  render() {
    return (
      <_Timer
        team_active={this.props.STATE.draftData.TEAM_ACTIVE}
        last_team_active={this.props.STATE.draftData.LAST_TEAM_ACTIVE}
      >
        <Transition
          trans={{
            animation:
              this.props.STATE.draftData.TIMER.START_SIDE === "team_1"
                ? "fadeInLeft"
                : "fadeInRight",
            delay: this.props.STATE.draftData.TIMER.DELAY,
          }}
        >
          <Transition
            trans={this.grabTimerTrans(
              this.props.STATE.draftData.TEAM_ACTIVE,
              this.props.STATE.draftData.LAST_TEAM_ACTIVE
            )}
          >
            <Timer
              resetKey={this.props.STATE.timerResetKey}
              theme={this.props.STATE.draftData.THEME}
              isPlaying={this.props.STATE.draftData.TEAM_ACTIVE > 0}
              size={TIMER_SIZE}
              seconds={this.props.STATE.draftData.TIMER.START_TIME}
              crit={7}
              strokeWidth={4}
            />
          </Transition>
        </Transition>
      </_Timer>
    );
  }
}
