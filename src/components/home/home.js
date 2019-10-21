import React from "react";
import { connect } from "react-redux";
import Components from "../../components";
import Loader from "../loader/loader";
import "./home.css";

class Home extends React.Component {
  state = {
    domMounted: false,
    modalVisible: false,
    modal: Components.Login
  };

  componentDidMount() {
    setTimeout(() => this.setState({ domMounted: true }), 1000);
  }

  setModal(modalVisible) {
    this.setState({ modalVisible });
  }

  openModal(modal) {
    this.setState({ modalVisible: false, modal });
    setTimeout(() => this.setState({ modalVisible: true }), 250);
  }

  render() {
    return (
      <div>
        <Loader domMounted={this.state.domMounted}>
          <Components.Header
            openModal={() => this.openModal(Components.Login)}
          />
          <Components.Modal
            width={"75%"}
            height={"75%"}
            openModal={modal => this.openModal(modal)}
            setModal={modalVisible => this.setModal(modalVisible)}
            visible={this.state.modalVisible}
            content={this.state.modal}
          />
          <Components.VideoLoop
            openModal={modal => this.openModal(modal)}
            setModal={modalVisible => this.setModal(modalVisible)}
          />
          <Components.HomePagePanel />
          <Components.HomeArticles />
          <Components.Footer />
        </Loader>
      </div>
    );
  }
}

export default connect()(Home);
