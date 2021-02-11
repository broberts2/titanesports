import React from "react";
import styled from "styled-components";
import Primary from "../Primary/Primary";
import Presentation from "../Presentation/Presentation";
import Pregame from "../Pregame/Pregame";

const Router = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  backtround-color: blue;
`;

export default class _ extends React.Component {

  componentDidMount() {
    if(this.props.STATE.draftData.STARTED) {
      setTimeout(() => this.props.STATE.setModalStatus(true),1000);
    }
  }

  render() {
    return (
      <Router>
        {this.props.STATE.draftData.STARTED ? (
          null
        ) : 
          <React.Fragment>
            <Primary STATE={this.props.STATE} />
            <Presentation STATE={this.props.STATE} />
          </React.Fragment>
        }
        <Pregame STATE={this.props.STATE} />
      </Router>
    );
  }
}
