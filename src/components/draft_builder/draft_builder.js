import React from "react";
import { connect } from "react-redux";
import "./draft_builder.css";
import Components from "../../components";

import Api from "../../Api";

const logo_index = require("../../../titan_draft/logo_index");

class DraftBuilder extends React.Component {
  state = {
    domMounted: false,
    blueTeam: "",
    redTeam: ""
  };

  componentDidMount() {
    this.setState({ domMounted: true });
  }

  render() {
    return (
      <div>
        <div className={"draft_builder"}>
          <h2>
            Welcome to the Titan Draft utility. Here you can create your own
            'prodraft' to determine your champion selection for official TES
            games.
          </h2>
          <h2>Blue Team</h2>
          <input
            value={this.state.blueTeam}
            onChange={e => this.setState({ blueTeam: e.target.value })}
          />
          <h2>Red Team</h2>
          <input
            value={this.state.redTeam}
            onChange={e => this.setState({ redTeam: e.target.value })}
          />
          <button
            style={
              true > 0 && true ? {} : { pointerEvents: "none", opacity: 0.3 }
            }
            onClick={() => this.props.startRequest(async () => "yolo")}
          >
            Login
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DraftBuilder);
