import React from "react";
import { connect } from "react-redux";
import Components from "../../components";
import "./slayers_guild.css";

import Api from "../../Api";

class RequestModal extends React.Component {
  render() {
    return (
      <div className={"modal"}>
        <h2>Update Podcast Listing?</h2>
        <button
          onClick={() => this.props.startRequest(Api.updateSlayersGuild())}
        >
          Update
        </button>
      </div>
    );
  }
}

class SlayersGuild extends React.Component {
  state = {
    domMounted: false,
    modalVisible: false,
    modalSize: {
      width: "45%",
      height: "75%"
    },
    videos: [],
    modal: <RequestModal />,
    modalSize: {
      width: "45%",
      height: "75%"
    },
    canEdit: false
  };

  setActiveVideo(activeVideo) {
    this.setState({ activeVideo });
  }

  playVideo() {}

  pauseVideo() {}

  async componentDidMount() {
    let videos = await Api.getSlayersGuild();
    const user = await Api.validateToken();
    console.log(user);
    if (user.l === 5 || user.l < 3) {
      this.setState({ canEdit: true });
    }
    videos = videos.videos;
    this.setState({ domMounted: true, videos });
  }

  setModal(modalVisible) {
    this.setState({ modalVisible });
  }

  openModal(modal, size) {
    this.setState({ modalVisible: false, modal, modalSize: size });
    setTimeout(() => this.setState({ modalVisible: true }), 250);
  }

  render() {
    return (
      <div className={"slayers_guild"}>
        <Components.Loader domMounted={this.state.domMounted}>
          <Components.Header
            openModal={() => this.openModal(<Components.Login />)}
          />
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
          {this.state.canEdit ? (
            <div className={"button-wrapper"}>
              <button
                onClick={() =>
                  this.openModal(this.state.modal, this.state.modalSize)
                }
              >
                Update Listing
              </button>
            </div>
          ) : null}
          <div className={"title"}>
            <h3>Welcome to the Slayer's Guild hosted by NewSlinky!</h3>
          </div>
          <div className={"body"}>
            {this.state.videos.map((el, i) => (
              <Components.MediaPlayer
                index={i}
                play={() => this.playVideo()}
                pause={() => this.pauseVideo()}
                setActiveVideo={video => this.setActiveVideo(video)}
                data={el}
              />
            ))}
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
)(SlayersGuild);
