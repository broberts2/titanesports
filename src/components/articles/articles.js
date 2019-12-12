import React from "react";
import { connect } from "react-redux";
import Components from "../../components";
import "./articles.css";

import Api from "../../Api";

class Articles extends React.Component {
  state = {
    domMounted: false,
    modalVisible: false,
    modalSize: {
      width: "45%",
      height: "75%"
    },
    articles: []
  };

  async componentDidMount() {
    const articles = await Api.getArticles();
    this.setState({
      domMounted: true,
      articles: Object.values(articles.articles)
    });
  }

  openModal(modal, size) {
    this.setState({ modalVisible: false, modal, modalSize: size });
    setTimeout(() => this.setState({ modalVisible: true }), 250);
  }

  setModal(modalVisible) {
    this.setState({ modalVisible });
  }

  builder() {
    const itemsPerRow = 3;
    let rows = [];
    let row = [];
    this.state.articles.map((el, i) => {
      row.push(
        <td height={"300px"}>
          <Components.ArticlePanel data={el} />
        </td>
      );
      if ((i + 1) % itemsPerRow === 0) {
        rows.push(<tr>{row}</tr>);
        row = [];
      }
    });
    if (this.state.articles.length < itemsPerRow) {
      for (let i = 0; i < itemsPerRow - this.state.articles.length; i++) {
        row.push(<td />);
      }
      rows.push(<tr>{row}</tr>);
    } else if (row.length > 0) {
      rows.push(<tr>{row}</tr>);
    }
    return (
      <table width={"100%"} style={{ tableLayout: "fixed" }}>
        <tbody>{rows}</tbody>
      </table>
    );
  }

  render() {
    return (
      <div className={"articles"}>
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
          <div className={"body"}>{this.builder()}</div>
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
)(Articles);
