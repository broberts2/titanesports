import React from "react";
import { Theme } from "arclight-react";
import Style from "../../../style";
import utils from "../../_utils_";

export default class _ extends React.Component {

    state = this.props.STATE;

    theme() {
        return utils.dropdown(
            "Theme", 
            this.props.STATE.THEME,
            (e) => this.setState({THEME: e.target.value}), 
            Object.keys(Theme)
        )
    }

    async submit() {
        const res = await this.props.STATE.GLOBAL_METHODS.doAction({
            THEME: this.state.THEME
        }, "put", "/WebsiteConfiguration/put");
        return res;
    }

    cancel() {
        this.setState(this.props.STATE);
    }

    render() {
        return (
            <Style.Panel backgroundColor={Theme[this.props.STATE.THEME].backgroundColor}>
                {this.theme()}
                {utils.confirms(this.props.STATE.THEME, () => this.submit(), () => this.cancel())}
            </Style.Panel>
        )
    }
  }