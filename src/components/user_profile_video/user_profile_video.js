import React from "react";
import { connect } from "react-redux";
import "./user_profile_video.css";

import Api from "../../Api";

const config = require("../../config");

class UserProfileVideo extends React.Component {
  state = {
    fileList: null,
    filesPerRow: 4,
    table: null,
    selectedVideo: null
  };

  async componentDidMount() {
    const fileList = await Api.getProfileVideos();
    this.setState({
      fileList: fileList.fileList,
      table: this.buildTable(fileList.fileList)
    });
  }

  buildTable(fileList, sel) {
    let row = [];
    let rows = [];
    fileList.map((el, i) => {
      row.push(<td>{this.video(el, sel)}</td>);
      if ((i + 1) % this.state.filesPerRow === 0) {
        rows.push(<tr>{row}</tr>);
        row = [];
      }
    });
    if (row.length > 0) {
      rows.push(<tr>{row}</tr>);
    }
    return rows;
  }

  video(el, sel) {
    return (
      <video
        onClick={() => {
          this.setState({
            table: this.buildTable(this.state.fileList, el),
            selectedVideo: el
          });
        }}
        style={
          sel
            ? sel === el
              ? {
                  border: "1px solid rgb(0, 240, 255)",
                  transform: "scale(1.5)"
                }
              : { opacity: 1 }
            : this.state.selectedVideo === el
            ? {
                border: "1px solid rgb(0, 240, 255)",
                transform: "scale(1.5)"
              }
            : { opacity: 1 }
        }
        muted
        preload="auto"
        loop
        autoPlay
      >
        <source src={`${config.serverPath}/${el}`} type={"video/webm"} />
      </video>
    );
  }

  render() {
    return (
      <div className={"user-profile-video"}>
        <table>
          <tbody>{this.state.table}</tbody>
        </table>
        <button
          onClick={async () => {
            await this.props.startRequest(
              Api.updateSelf({ profileVideo: this.state.selectedVideo })
            );
            window.location.reload();
          }}
        >
          Update
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
)(UserProfileVideo);
