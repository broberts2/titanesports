import React from "react";
import { connect } from "react-redux";
import "./footer.css";

class Footer extends React.Component {
  state = {
    domMounted: false
  };

  componentDidMount() {
    this.setState({ domMounted: true });
  }

  render() {
    return (
      <div className={"footer"}>
        <div className={"logo"}>
          <img alt={""} src={require("../../img/logo2.png")} />
        </div>
        <h3>Titan E-Sports 2019</h3>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer);
