import React from "react";
import { connect } from "react-redux";
import ReactLoader from "react-loader-spinner";
import "./loader.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

class Loader extends React.Component {
  render() {
    const dims = 250;
    const style = {
      pointerEvents: this.props.domMounted ? "none" : ""
    };
    const style2 = !this.props.domMounted
      ? { height: "50px", overflow: "hidden" }
      : {};
    return (
      <div>
        <div style={style2}>{this.props.children}</div>
        <div
          className={`loader ${this.props.domMounted ? "anim-fade-out" : ""}`}
          style={style}
        >
          <div className={"icon"}>
            <ReactLoader
              type={"Triangle"}
              color={"#870018"}
              height={dims}
              width={dims}
              timeout={0}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(Loader);
