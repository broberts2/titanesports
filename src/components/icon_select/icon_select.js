import React from "react";
import { connect } from "react-redux";
import "./icon_select.css";

import Api from "../../Api";

const config = require("../../config");

class IconSelect extends React.Component {
  state = {
    iconIndex: 0,
    iconStep: 55,
    itemsPerRow: 10,
    table: null,
    totalCount: 0,
    selectedImage: null,
    iconList: null
  };

  async request(i) {
    const iconList = await Api.requestProfileIconList({
      index: (this.state.iconIndex + i) * this.state.iconStep,
      size: this.state.iconStep
    });
    this.setState({
      iconList,
      iconIndex: this.state.iconIndex + i,
      table: this.buildTable(iconList),
      totalCount: iconList.totalCount
    });
  }

  componentDidMount() {
    this.request(0);
  }

  async updateIcon() {
    await this.props.startRequest(
      Api.updateSelf({ iconId: this.state.selectedImage })
    );
    this.props.validateQuery();
  }

  buildTable(iconList, sel) {
    let row = [];
    let rows = [];
    iconList.fileList.map((el, i) => {
      if ((i + 1) % (this.state.itemsPerRow + 1) === 0) {
        rows.push(<tr key={i}>{row.map(el => el)}</tr>);
        row = [];
      } else {
        row.push(
          <td key={i}>
            <img
              onClick={() => {
                this.setState({
                  table: this.buildTable(this.state.iconList, el),
                  selectedImage: el
                });
              }}
              alt={""}
              src={`${config.serverPath}/${config.currentVersion}/img/profileicon/${el}`}
              style={
                sel
                  ? sel === el
                    ? {
                        border: "1px solid rgb(0, 240, 255)",
                        transform: "scale(1.5)"
                      }
                    : { opacity: 1 }
                  : this.state.selectedImage === el
                  ? {
                      border: "1px solid rgb(0, 240, 255)",
                      transform: "scale(1.5)"
                    }
                  : { opacity: 1 }
              }
            />
          </td>
        );
      }
    });
    if (row.length > 0) {
      rows.push(<tr>{row.map(el => el)}</tr>);
    }
    return (
      <table>
        <tbody>{rows}</tbody>
      </table>
    );
  }

  render() {
    return (
      <div className={"icon-select"}>
        {this.state.table}
        <div className={"controls-wrapper"}>
          <div className={"controls"}>
            <button
              style={
                this.state.iconIndex > 0
                  ? {}
                  : { pointerEvents: "none", opacity: 0.25 }
              }
              onClick={async () => this.request(-1)}
            >
              <i className={"fas fa-long-arrow-alt-left"}></i>
            </button>
            <button
              className={"middle"}
              onClick={async () => this.updateIcon()}
            >
              Update
            </button>
            <button
              style={
                this.state.iconIndex > -1
                  ? {}
                  : { pointerEvents: "none", opacity: 0.25 }
              }
              onClick={async () => this.request(1)}
            >
              <i className={"fas fa-long-arrow-alt-right"}></i>
            </button>
          </div>
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
)(IconSelect);
