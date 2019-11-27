import React from "react";
import Components from "../../components";
import ReactModal from "react-awesome-modal";
import "./modal.css";

class Champion extends React.Component {
  render() {
    return (
      <div className={"champion"}>
        <img
          src={
            this.props.data.tileImg
              ? this.props.data.tileImg
              : require("../../img/urf_tile.png")
          }
          onClick={() => this.props.click(this.props.data)}
        />
        <div className={"name"}>
          <h6>{this.props.data.name}</h6>
        </div>
      </div>
    );
  }
}

class Modal extends React.Component {
  state = {
    searchTerm: "",
    selectedIndex: 0,
    previewImage: Object.values(this.props.state.championData)[0].loadingImg,
    previewName: Object.values(this.props.state.championData)[0].name,
    rows: []
  };

  idCheck(id) {
    const blue_pick = Object.values(this.props.state.data.blue.pick).some(el =>
      el && el.name !== "Urf" ? el.id === id : null
    );
    const blue_ban = Object.values(this.props.state.data.blue.ban).some(el =>
      el && el.name !== "Urf" ? el.id === id : null
    );
    const red_pick = Object.values(this.props.state.data.red.pick).some(el =>
      el && el.name !== "Urf" ? el.id === id : null
    );
    const red_ban = Object.values(this.props.state.data.red.ban).some(el =>
      el && el.name !== "Urf" ? el.id === id : null
    );
    return blue_pick || blue_ban || red_pick || red_ban;
  }

  buildList(searchTerm = "", reset) {
    let rows = [];
    let row = [];
    const itemsPerRow = 10;
    const champs = Object.values(this.props.state.championData).filter(el =>
      (searchTerm.length > 0 &&
        !el.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      el.suspended ||
      this.idCheck(el.id)
        ? null
        : el
    );
    if (reset) {
      this.setState({
        previewImage: champs[0].loadingImg,
        previewName: champs[0].name,
        selectedIndex: champs[0].id
      });
    }
    champs.map((el, i) => {
      row.push(
        <td>
          <Champion
            data={el}
            click={data =>
              this.setState({
                previewImage: data.loadingImg,
                previewName: data.name,
                selectedIndex: data.id
              })
            }
          />
        </td>
      );
      if ((i + 1) % itemsPerRow === 0) {
        rows.push(<tr>{row}</tr>);
        row = [];
      }
    });
    if (row.length > 0) {
      for (let i = 0; i < itemsPerRow - row.length; i++) {
        row.push(<td></td>);
      }
      rows.push(<tr>{row}</tr>);
    }
    this.setState({ rows, searchTerm });
  }

  componentDidMount() {
    this.buildList();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.state.modal !== this.props.state.modal) {
      this.buildList("", true);
    }
  }

  render() {
    let timer = null;
    if (this.props.state.blueTime >= 0) {
      timer = this.props.state.blueTime;
    } else if (this.props.state.redTime >= 0) {
      timer = this.props.state.redTime;
    }
    return (
      <ReactModal
        visible={this.props.state.modal}
        width={"90%"}
        height={"90%"}
        effect="fadeInUp"
        onClickAway={() => this.props.actions.setModal(false)}
      >
        <div className={"modal"}>
          <div className={"timer"}>
            <h1>{timer}</h1>
          </div>
          <div className={"pick-ban"}>
            <h1>Pick Phase</h1>
          </div>
          <div className={"champion-picker"}>
            <div className={"search"}>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <h2>Search:</h2>
                    </td>
                    <td>
                      <input
                        placeholder={"Search Query"}
                        value={this.state.searchTerm}
                        onChange={e => this.buildList(e.target.value)}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <table>
              <tbody>
                <tr>
                  <td width="20%">
                    <div className={"champion-preview"}>
                      <img
                        src={
                          this.state.previewImage
                            ? this.state.previewImage
                            : require("../../img/urf_loading.png")
                        }
                      />
                      <div className={"name"}>
                        <h2>{this.state.previewName}</h2>
                      </div>
                    </div>
                  </td>
                  <td height="100">
                    <div className={"champion-list"}>
                      <table>
                        <tbody>{this.state.rows}</tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={"submit"}>
            <button
              onClick={() =>
                this.props.actions.submitButton(this.state.selectedIndex)
              }
            >
              Submit
            </button>
          </div>
        </div>
      </ReactModal>
    );
  }
}

export default Modal;
