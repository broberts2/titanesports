import React from "react";
import { connect } from "react-redux";
import Components from "../../components";
import "./reset_password.css";

import Api from "../../Api";

class ResetPassword extends React.Component {
  state = {
    domMounted: false,
    modalVisible: false,
    modalSize: {
      width: "45%",
      height: "75%"
    },
    pw: "",
    newPw: ""
  };

  componentDidMount() {
    var params = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => {
      params[key] = value;
    });
    this.setState({ domMounted: true, params });
  }

  openModal(modal, size) {
    this.setState({ modalVisible: false, modal, modalSize: size });
    setTimeout(() => this.setState({ modalVisible: true }), 250);
  }

  setModal(modalVisible) {
    this.setState({ modalVisible });
  }

  render() {
    return (
      <div className={"reset_password"}>
        <Components.Loader domMounted={this.state.domMounted}>
          <Components.Header
            openModal={() => this.openModal(<Components.Login />)}
          />
          <Components.Modal
            submitRequest={this.state.request}
            width={this.state.modalSize.width}
            height={this.state.modalSize.height}
            openModal={modal =>
              this.openModal(modal, {
                width: "45%",
                height: "75%"
              })
            }
            setModal={modalVisible => this.setModal(modalVisible)}
            visible={this.state.request && this.state.modalVisible}
          ></Components.Modal>
          <div className={"body"}>
            {this.state.params &&
            this.state.params.u &&
            this.state.params.key ? (
              <div className={"content"}>
                <h3>Username</h3>
                <h4>{this.state.params.u}</h4>
                <h3>New Password</h3>
                <input
                  type={"password"}
                  value={this.state.pw}
                  onChange={e => this.setState({ pw: e.target.value })}
                />
                <h3>Confirm Password</h3>
                <input
                  type={"password"}
                  value={this.state.newPw}
                  onChange={e => this.setState({ newPw: e.target.value })}
                />
                <button
                  style={
                    this.state.pw.length > 0 &&
                    this.state.newPw.length > 0 &&
                    this.state.pw === this.state.newPw
                      ? {}
                      : { pointerEvents: "none", opacity: 0.3 }
                  }
                  onClick={() =>
                    this.setState({
                      modalVisible: true,
                      request: () =>
                        Api.compareResetKey({
                          key: this.state.params.key,
                          password: this.state.pw
                        })
                    })
                  }
                >
                  Submit
                </button>
              </div>
            ) : (
              <div className={"unauthorized"}>
                <h1>403</h1>
              </div>
            )}
          </div>
          <Components.Footer />
        </Components.Loader>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPassword);
