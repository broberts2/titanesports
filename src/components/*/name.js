import React from "react";
import { connect } from "react-redux";
import Components from "../../components";
import Loader from "../loader/loader";
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
        <Loader domMounted={this.state.domMounted} />
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
