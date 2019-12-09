import React from "react";
import { connect } from "react-redux";
import Components from "../../components";
import "./pip.css";

class Pip extends React.Component {
  state = {};

  render() {
    return (
      <div className={"pip"}>
        <iframe
          frameBorder="0"
          width={"100%"}
          height={"100%"}
          src={"https://www.youtube.com/embed/yMzESw_hTvg"}
          allowfullscreen={"true"}
        ></iframe>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pip);
