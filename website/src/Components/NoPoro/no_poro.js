import React from "react";
import Style from "./style";
import { Img, Text, Transition } from "arclight-react";

export default class _ extends React.Component {
    render() {
        return (
            <Style.Base>
                <Transition trans={this.props.trans}>
                    <Img src={`${this.props.STATE.ENDPOINT}/static/assets/poro.jpg`} />
                    <Style.PoroText align={this.props.align}>
                        <Text theme={this.props.STATE.THEME}>{this.props.text}</Text>
                    </Style.PoroText>
                </Transition>
            </Style.Base>
        )
    }
}