import React from "react";
import { connect } from "react-redux";
import Components from "../../components";
import "./name.css";

class Name extends React.Component {
  state = {
    domMounted: false
  };

  componentDidMount() {
    this.setState({ domMounted: true });
  }

  render() {
    return (
      <div className={"name"}>
        <Components.Loader
          domMounted={this.state.domMounted}
        ></Components.Loader>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Name);
