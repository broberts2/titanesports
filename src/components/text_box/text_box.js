import React from "react";
import { connect } from "react-redux";
import "./text_box.css";

class TextBox extends React.Component {
  state = {
    domMounted: false,
    savedContent: this.props.content || ""
  };

  componentDidMount() {
    document.getElementById("text").innerHTML = this.state.savedContent;
    this.setState({
      domMounted: true
    });
  }

  revert() {
    document.getElementById("text").innerHTML = this.state.savedContent;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.content !== this.props.content) {
      this.setState({ content: this.props.content });
    }
  }

  render() {
    return (
      <div
        style={{
          fontSize: this.props.fontSize ? this.props.fontSize : "inherit",
          color: this.props.fontColor ? this.props.fontColor : "inherit",
          marginBottom: this.props.canEdit ? "100px" : "0px"
        }}
        className={"text_box"}
      >
        <div
          id={"text"}
          contenteditable={"true"}
          style={{
            backgroundColor: this.props.canEdit
              ? "rgba(42, 42, 42, 0.25)"
              : "transparent",
            pointerEvents: this.props.canEdit ? "" : "none"
          }}
        ></div>
        {this.props.canEdit ? (
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
