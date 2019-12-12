import React from "react";
import { connect } from "react-redux";
import "./text_box.css";

class TextBox extends React.Component {
  state = {
    domMounted: false,
    savedContent: this.props.content || ""
  };

  setContent(boolean) {
    if (boolean) {
      document.getElementById("text").innerText = this.state.savedContent;
    } else {
      document.getElementById("text").innerHTML = this.state.savedContent;
    }
  }

  componentDidMount() {
    this.setContent();
    this.setState({
      domMounted: true
    });
  }

  revert() {
    document.getElementById("text").innerHTML = this.state.savedContent;
  }

  componentDidUpdate(prevProps) {
    console.log(prevProps);
    if (prevProps.canEdit !== this.props.canEdit) {
      this.setContent(this.props.canEdit);
      this.setState({ canEdit: this.props.canEdit });
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
          id={"text"}
          contenteditable={"true"}
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
