import React from "react";
import { connect } from "react-redux";
import ReactClass from "create-react-class";
import "./text_box.css";

class TextBox extends React.Component {
  state = {
    domMounted: false,
    content: this.props.content || "",
    savedContent: this.props.content || ""
  };

  componentDidMount() {
    this.setState({ domMounted: true });
  }

  revert() {
    this.setState({
      content: this.state.savedContent
    });
  }

  render() {
    return (
      <div
        style={{
          fontSize: this.props.fontSize ? this.props.fontSize : "inherit",
          color: this.props.fontColor ? this.props.fontColor : "inherit"
        }}
        className={"text_box"}
      >
        <textarea
          spellCheck={this.props.canEdit}
          disabled={!this.props.canEdit}
          value={this.state.content}
          placeholder={this.props.placeholder ? this.props.placeholder : ""}
          onChange={e =>
            this.props.canEdit
              ? this.setState({
                  content: e.target.value
                })
              : null
          }
          style={{
            spellcheck: this.props.canEdit,
            textIndent: this.props.textIndent ? this.props.textIndent : 35,
            backgroundColor: this.props.canEdit
              ? "rgba(0, 0, 0, 0.15)"
              : "transparent"
          }}
        />
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
            ></i>
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
