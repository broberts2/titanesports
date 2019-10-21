import React from "react";
import { connect } from "react-redux";
import "./logout.css";

import Api from "../../Api";

class Logout extends React.Component {
  state = {
    domMounted: false
  };

  componentDidMount() {
    this.setState({ domMounted: true });
  }

  render() {
    return (
      <div className={"logout"}>
        <div className={"content"}>
          <h2>Logout?</h2>
          <button onClick={() => Api.logoutUser()}>Submit</button>
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
)(Logout);
