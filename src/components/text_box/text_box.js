import React from "react";
import { connect } from "react-redux";
import "./text_box.css";

class TextBox extends React.Component {
  state = {
    domMounted: false,
    content: this.props.content || "",
    maxContent: this.props.content || "",
    savedContent: this.props.content || ""
  };

  componentDidMount() {
    this.setState({ domMounted: true });
  }

  save() {
    this.setState({
      savedContent: this.state.content,
      maxContent: this.state.content
    });
    if (this.props.saveCB) {
      this.props.saveCB(this.state.savedContent);
    }
  }

  reset() {
    this.setState({
      content: this.state.savedContent,
      maxContent: this.state.content
    });
  }

  revert() {
    this.setState({
      content: this.state.maxContent,
      maxContent: this.state.content
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
          value={this.state.content}
          placeholder={this.props.placeholder ? this.props.placeholder : ""}
          onChange={e =>
            this.props.canEdit
              ? this.setState({
                  content: e.target.value
                })
              : null
          }
          rows={this.props.rows ? this.props.rows : 4}
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
            <i onClick={() => this.save()} className={"fas fa-save"}></i>
            <i
              onClick={() => this.revert()}
              className={"fas fa-share-square"}
            ></i>
            <i
              onClick={() => this.reset()}
              className={"fas fa-window-close"}
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
