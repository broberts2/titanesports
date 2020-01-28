import React from "react";
import { connect } from "react-redux";
import "./text_box.css";

class TextBox extends React.Component {
  state = {
    domMounted: false,
    savedContent: this.props.content || "",
    canEdit: false
  };

  setContent() {
    if (this.state.canEdit) {
      document.getElementById(
        `text${this.props.index ? this.props.index : ""}`
      ).innerText = this.state.savedContent;
    } else {
      document.getElementById(
        `text${this.props.index ? this.props.index : ""}`
      ).innerHTML = this.state.savedContent;
    }
  }

  componentDidMount() {
    this.setState({
      canEdit: this.props.canEdit,
      domMounted: true
    });
    this.setContent();
  }

  revert() {
    document.getElementById(
      `text${this.props.index ? this.props.index : ""}`
    ).innerText = this.state.savedContent;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.content !== this.props.content) {
      this.setContent();
      this.setState({ savedContent: this.props.content });
    }
  }

  render() {
    return (
      <div
        style={{
          fontSize: this.props.fontSize ? this.props.fontSize : "inherit",
          color: this.props.fontColor ? this.props.fontColor : "inherit",
          marginBottom: this.state.canEdit ? "100px" : "0px"
        }}
        className={"text_box"}
      >
        <div
          id={`text${this.props.index ? this.props.index : ""}`}
          contentEditable={"true"}
          className={"text"}
          style={{
            backgroundColor: this.state.canEdit
              ? "rgba(42, 42, 42, 0.25)"
              : "transparent",
            pointerEvents: this.state.canEdit ? "" : "none"
          }}
        ></div>
        {this.state.canEdit ? (
          <div
            style={{
              color: this.props.fontColor ? this.props.fontColor : "inherit"
            }}
            className={"icons"}
          >
            <i
              onClick={() => this.revert()}
              className={"fas fa-share-square"}
            />
            {this.props.cancel_cb ? (
              <i
                onClick={() => this.props.cancel_cb()}
                className={"far fa-window-close"}
              />
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TextBox);
