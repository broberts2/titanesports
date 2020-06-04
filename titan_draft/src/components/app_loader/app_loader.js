import React from "react";
import { css } from "@emotion/core";
import RingLoader from "react-spinners/RingLoader";
import Components from "../../components";
import "./app_loader.css";

export default class AppLoader extends React.Component {
  state = {
    animation: "none",
  };
  componentDidUpdate(prevProps) {
    if (this.props.loaded !== prevProps.loaded) {
      setTimeout(() => this.setState({ animation: "fadeOut" }), 2000);
    }
  }
  render() {
    return (
      <div className={"app_loader"}>
        <Components.Anim animationName={this.state.animation}>
          <div className={"background"}>
            <div className={"spinner"}>
              <RingLoader size={225} color={"#ff006b"} loading={true} />
            </div>
          </div>
        </Components.Anim>
      </div>
    );
  }
}
