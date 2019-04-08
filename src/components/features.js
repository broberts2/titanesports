import React, { Component } from "react";
import Card from "../components/card";

class Features extends Component {
  render() {
    return (
      <center>
        <div className={"features"}>
          <table>
            <tbody>
              <tr>
                <td>
                  <Card
                    img={"fa-feather-alt"}
                    cb={() => console.log("pressed")}
                  >
                    <h1>About</h1>
                  </Card>
                </td>
                <td>
                  <Card img={"fa-fire"} cb={() => console.log("pressed")}>
                    <h1>News</h1>
                  </Card>
                </td>
                <td>
                  <Card img={"fa-chess"} cb={() => this.props.modalControl()}>
                    <h1>Statistics</h1>
                  </Card>
                </td>
              </tr>
              <tr>
                <td>
                  <Card img={"fa-envelope"} cb={() => console.log("pressed")}>
                    <h1>Contact Us</h1>
                  </Card>
                </td>
                <td>
                  <Card img={"fa-user-tie"} cb={() => console.log("pressed")}>
                    <h1>Business Inquiry</h1>
                  </Card>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </center>
    );
  }
}

export default Features;
