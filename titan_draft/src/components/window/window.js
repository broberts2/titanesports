import React from "react";
import Components from "../../components";
import "./window.css";

class Window extends React.Component {
  render() {
    return (
      <div className={"window"}>
        <div className={"background-video"}>
          <video muted preload="auto" loop autoPlay>
            <source
              src={require("../../videos/animated-ionia.webm")}
              type={"video/webm"}
            />
          </video>
        </div>
        <div className={"content"}>
          <table>
            <tbody>
              <tr>
                <td>
                  <div className={"blue"}>
                    <table>
                      <tbody>
                        <tr>
                          {Object.values(this.props.state.blue.pick).map(
                            (el, i) => (
                              <td>
                                <Components.Card
                                  state={this.props.state}
                                  id={i}
                                  blue
                                  simple={this.props.state.simple}
                                  championData={el ? el : null}
                                />
                              </td>
                            )
                          )}
                        </tr>
                      </tbody>
                    </table>
                    <table>
                      <tbody>
                        <tr>
                          {Object.values(this.props.state.blue.ban).map(
                            (el, i) => (
                              <td align="center">
                                <Components.Card
                                  state={this.props.state}
                                  id={i + 10}
                                  blue
                                  simple={this.props.state.simple}
                                  banned
                                  championData={el ? el : null}
                                />
                              </td>
                            )
                          )}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
                <td>
                  <div className={"red"}>
                    <table>
                      <tbody>
                        <tr>
                          {Object.values(this.props.state.red.pick).map(
                            (el, i) => (
                              <td>
                                <Components.Card
                                  state={this.props.state}
                                  id={i + 5}
                                  simple={this.props.state.simple}
                                  championData={el ? el : null}
                                />
                              </td>
                            )
                          )}
                        </tr>
                      </tbody>
                    </table>
                    <table>
                      <tbody>
                        <tr>
                          {Object.values(this.props.state.red.ban).map(
                            (el, i) => (
                              <td align="center">
                                <Components.Card
                                  state={this.props.state}
                                  id={i + 15}
                                  simple={this.props.state.simple}
                                  banned
                                  championData={el ? el : null}
                                />
                              </td>
                            )
                          )}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Window;
