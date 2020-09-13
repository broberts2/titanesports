import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { Timer, Transition } from "arclight-react";

const TIMER_SIZE = 100;

const _Timer = styled.div`
  position: absolute;
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
          ? this.props.STATE.config.TIMER.LEFT_TRANSITION_OUT
          : this.props.STATE.config.TIMER.RIGHT_TRANSITION_OUT;
      case 1:
        return this.props.STATE.config.TIMER.LEFT_TRANSITION;
      case 2:
        return this.props.STATE.config.TIMER.RIGHT_TRANSITION;
    }
  }

  render() {
    return (
      <ThemeProvider theme={{}}>
        <_Timer
          team_active={this.props.STATE.team_active}
          last_team_active={this.props.STATE.last_team_active}
        >
          <Transition
            trans={this.grabTimerTrans(
              this.props.STATE.team_active,
              this.props.STATE.last_team_active
            )}
          >
            <Timer
              theme={this.props.STATE.config.THEME}
              isPlaying={false}
              size={TIMER_SIZE}
              seconds={60}
              crit={7}
              strokeWidth={4}
              onComplete={() => console.log("Timer Finished")}
            />
          </Transition>
        </_Timer>
      </ThemeProvider>
    );
  }
}
