import React from "react";
import { connect } from "react-redux";
import "./login.css";
import Components from "../../components";

import Api from "../../Api";

class Login extends React.Component {
  state = {
    domMounted: false,
    u: "",
    p: ""
  };

  componentDidMount() {
    this.setState({ domMounted: true });
  }

  render() {
    return (
      <div>
        <div className={"login"}>
          <h2>Username</h2>
          <input onChange={e => this.setState({ u: e.target.value })} />
          <h2>Password</h2>
          <input
            onChange={e => this.setState({ p: e.target.value })}
            type={"password"}
          />
          <button
            style={
              this.state.u.length > 0 && this.state.p.length > 0
                ? {}
                : { pointerEvents: "none", opacity: 0.3 }
            }
            onClick={() =>
              this.state.u.length > 0 && this.state.p.length > 0
                ? this.props.startRequest(
                    Api.loginUser({
                      username: this.state.u,
                      password: this.state.p
                    })
                  )
                : null
            }
          >
            Login
          </button>
          <div
            className={"anchor"}
            onClick={() => this.props.openModal(<Components.SignUp />)}
            style={
              this.state.u.length > 0 || this.state.p.length > 0
                ? { opacity: 0 }
                : {}
            }
          >
            Don't have an account?
          </div>
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
)(Login);
