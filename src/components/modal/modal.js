import React from "react";
import ReactModal from "react-awesome-modal";
import ReactLoader from "react-loader-spinner";
import { connect } from "react-redux";
import "./modal.css";

class Modal extends React.Component {
  state = {
    domMounted: false,
    requestPending: false,
    requestStatus: null
  };

  async startRequest(promise, ignore) {
    this.setState({ requestPending: true, loadAnim: "anim-fade-in" });
    const value = await promise;
    this.setState({
      requestPending: false,
      loadAnim: "anim-fade-out",
      requestStatus: ignore
        ? null
        : {
            msg: value.msg
          }
    });
  }

  componentDidMount() {
    this.setState({ domMounted: true });
  }

  renderRequest() {
    return (
      <div className={"request"}>
        <h2>{this.state.requestStatus.msg}</h2>
        <button
          onClick={() => {
            if (this.state.requestStatus.msg === "Login Successful!") {
              setTimeout(() => window.location.reload(), 100);
            } else {
              this.props.setModal(false);
              this.setState({ requestStatus: null });
            }
          }}
        >
          Close
        </button>
      </div>
    );
  }

  render() {
    return (
      <div style={{ pointerEvents: this.props.visible ? "" : "none" }}>
        <ReactModal
          visible={this.props.visible}
          width={this.props.width}
          height={this.props.height}
          effect="fadeInUp"
          onClickAway={() =>
            this.state.requestPending || this.state.requestStatus
              ? null
              : this.props.setModal(false)
          }
        >
          <div className={"modal"}>
            <div className={"header"}>
              <div className={"img"}>
                <img alt={""} src={require("../../img/logo2.png")} />
              </div>
            </div>
            <div className={"content-wrapper"}>
              <div className={"content"}>
                {this.state.requestStatus
                  ? this.renderRequest()
                  : this.props.children
                  ? React.cloneElement(this.props.children, {
                      openModal: modal => this.props.openModal(modal),
                      startRequest: (cb, ignore) =>
                        this.startRequest(cb, ignore),
                      validateQuery: () => this.props.validateQuery()
                    })
                  : null}
              </div>
            </div>
            <div
              className={`modal-loader`}
              style={{
                pointerEvents: this.state.requestPending ? "" : "none",
                opacity: this.state.requestPending ? 1 : 0
              }}
            >
              <div className={"icon"}>
                <ReactLoader
                  type={"Triangle"}
                  color={"#870018"}
                  height={250}
                  width={250}
                  timeout={0}
                />
              </div>
            </div>
          </div>
        </ReactModal>
      </div>
    );
  }
}

export default connect()(Modal);
