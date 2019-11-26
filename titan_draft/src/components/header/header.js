import React from "react";
import Components from "../../components";
import "./header.css";

class Header extends React.Component {
  render() {
    return (
      <div
        className={"header"}
        style={{ boxShadow: `0px 25px 50px ${this.props.state.glowColor}` }}
      >
        <div
          className={"logo"}
          style={{ boxShadow: `0px 25px 25px ${this.props.state.glowColor}` }}
        >
          <img src={require("../../img/logo.png")} />
          <div className={"blue-time"}>
            {this.props.state.blueTime >= 0 ? (
              <h1>{this.props.state.blueTime}</h1>
            ) : null}
          </div>
          <div className={"red-time"}>
            {this.props.state.redTime >= 0 ? (
              <h1>{this.props.state.redTime}</h1>
            ) : null}
          </div>
        </div>
        <div className={"team1 team"}>
          <table>
            <tbody>
              <tr>
                <td>
                  <img src={this.props.blue_img} />
                </td>
                <td>
                  <h2>{this.props.blue_team}</h2>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={"team2 team"}>
          <table>
            <tbody>
              <tr>
                <td>
                  <h2>{this.props.red_team}</h2>
                </td>
                <td>
                  <img src={this.props.red_img} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Header;
