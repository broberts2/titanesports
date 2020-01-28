import React from "react";
import { connect } from "react-redux";
import Components from "../../components";
import "./media_player.css";

class MediaPlayer extends React.Component {
  state = {
    modalVisible: false,
    modalSize: {
      width: "45%",
      height: "75%"
    },
    expanded: false
  };

  openModal(modal, size) {
    this.setState({ modalVisible: false, modal, modalSize: size });
    setTimeout(() => this.setState({ modalVisible: true }), 250);
  }

  setModal(modalVisible) {
    this.setState({ modalVisible });
  }

  render() {
    return (
      <div
        id={`media_player_${this.props.index}`}
        className={"media_player"}
        onClick={() => {
          this.setState({ expanded: !this.state.expanded });
          document
            .getElementById(`media_player_${this.props.index}`)
            .scrollIntoView();
        }}
      >
        <Components.Modal
          width={this.state.modalSize.width}
          height={this.state.modalSize.height}
          openModal={modal =>
            this.openModal(modal, {
              width: "45%",
              height: "75%"
            })
          }
          setModal={modalVisible => this.setModal(modalVisible)}
          visible={this.state.modalVisible}
        >
          {this.state.modal}
        </Components.Modal>
        <i
          className={
            this.state.expanded
              ? "far fa-window-minimize"
              : "far fa-window-maximize"
          }
        ></i>
        <h4>{this.props.data.title}</h4>
        <div
          className={"video"}
          style={{ height: this.state.expanded ? "500px" : "0px" }}
        >
          <iframe
            frameBorder="0"
            width={"100%"}
            height={"100%"}
            src={this.props.data.src}
            allowfullscreen={"true"}
          ></iframe>
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
)(MediaPlayer);
