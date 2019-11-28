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
    redTeam: "",
    blueCheck: true,
    blueIndex: -1,
    redIndex: -1
  };

  componentDidMount() {
    this.setState({ domMounted: true });
  }

  renderLogos() {
    const itemsPerRow = 5;
    let row = [];
    let rows = [];
    Object.values(logo_index).map((el, i) => {
      row.push(
        <td>
          <div
            className={`image`}
            onClick={() =>
              this.state.blueCheck
                ? this.setState({ blueIndex: i })
                : this.setState({ redIndex: i })
            }
          >
            <img
              className={`${
                this.state.blueIndex === i ? "blue-highlight" : ""
              } ${this.state.redIndex === i ? "red-highlight" : ""}`}
              src={el[1]}
            />
          </div>
        </td>
      );
      if ((i + 1) % itemsPerRow === 0) {
        rows.push(<tr>{row}</tr>);
        row = [];
      }
    });
    if (row.length > 0) {
      rows.push(<tr>{row}</tr>);
    }
    return (
      <div className={"logos"}>
        <table>
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  }

  render() {
    return (
      <div className={"draft_builder"}>
        <div className={"intro"}>
          <h2>
            Welcome to the Titan Draft utility. Here you can create your own
            'prodraft' to determine your champion selection for official TES
            games. Specify team names for both blue and red teams as well as a
            corresponding team logo.
          </h2>
        </div>
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
        <label className={"checkbox"}>
          Blue
          <input
            type={"checkbox"}
            checked={this.state.blueCheck}
            value={this.state.blueTeam}
            onChange={e => this.setState({ blueTeam: e.target.value })}
            onClick={() => this.setState({ blueCheck: true, redCheck: false })}
          />
          <div className={"checkmark"} />
        </label>
        <label className={"checkbox"}>
          Red
          <input
            type={"checkbox"}
            checked={!this.state.blueCheck}
            value={this.state.redTeam}
            onChange={e => this.setState({ redTeam: e.target.value })}
            onClick={() => this.setState({ blueCheck: false, redCheck: true })}
          />
          <div className={"checkmark"} />
        </label>
        {this.renderLogos()}
        <button
          style={
            this.state.blueIndex >= 0 &&
            this.state.redIndex >= 0 &&
            this.state.blueTeam.length > 0 &&
            this.state.redTeam.length > 0
              ? {}
              : { pointerEvents: "none", opacity: 0.3 }
          }
          onClick={() =>
            this.props.startRequest(
              Api.createTitanDraft({
                type: "tournament",
                t1_logo: Object.values(logo_index).filter((el, i) =>
                  i === this.state.blueIndex ? el[1] : null
                ),
                t2_logo: Object.values(logo_index).filter((el, i) =>
                  i === this.state.redIndex ? el[1] : null
                ),
                t1_name: this.state.blueTeam,
                t2_name: this.state.redTeam
              })
            )
          }
        >
          Create Titan Draft
        </button>
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
