import React from "react";
import { connect } from "react-redux";
import Components from "../../components";
import Loader from "../loader/loader";
import "./sign_up.css";

const Api = require("../../Api");

class SignUp extends React.Component {
  state = {
    domMounted: false,
    u: "",
    p: "",
    p2: "",
    e: ""
  };

  componentDidMount() {
    this.setState({ domMounted: true });
  }

  render() {
    return (
      <div className={"sign_up"}>
        <h2>Username</h2>
        <input onChange={e => this.setState({ u: e.target.value })} />
        <h2>Password</h2>
        <input
          onChange={e => this.setState({ p: e.target.value })}
          type={"password"}
        />
        <h2>Confirm Password</h2>
        <input
          onChange={e => this.setState({ p2: e.target.value })}
          type={"password"}
        />
        <h2>Email Address</h2>
        <input onChange={e => this.setState({ e: e.target.value })} />
        <button
          style={
            this.state.u.length > 0 &&
            this.state.p.length > 0 &&
            this.state.p2.length > 0 &&
            this.state.e.length > 0
              ? {}
              : { pointerEvents: "none", opacity: 0.3 }
          }
          onClick={() =>
            this.state.u.length > 0 &&
            this.state.p.length > 0 &&
            this.state.p2.length > 0 &&
            this.state.e.length > 0
              ? this.props.startRequest(
                  Api.createUser({
                    username: this.state.u,
                    password: this.state.p,
                    password2: this.state.p2,
                    email: this.state.e
                  })
                )
              : null
          }
        >
          Submit
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
)(SignUp);
