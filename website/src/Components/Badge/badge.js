import React from "react";
import Style from "./style";
import { HoverCard, Img, Text, Theme } from "arclight-react";

export default class _ extends React.Component {
    render() {
        return (
            <Style.Base size={this.props.cfg.size}>
                <Style.HoverCard size={this.props.cfg.size}>
                    <HoverCard
                        onClick={() => {
                            this.props.STATE.GLOBAL_METHODS.setViewingBadgeId(this.props.cfg._id);
                            this.props.STATE.GLOBAL_METHODS.showModal("Badge")
                        }}
                        theme={this.props.STATE.THEME}
                        size={{ width: this.props.cfg.size, height: this.props.cfg.size }}
                        front={
                            <Style.Front theme={this.props.STATE.THEME} cfg={this.props.cfg} size={this.props.cfg.size} >
                                {this.props.cfg.primaryImage ? <Style.PrimaryImg >
                                    <Img src ={this.props.STATE.ENDPOINT + '/' + this.props.cfg.primaryImage} />
                                </Style.PrimaryImg> : null}
                                <Style.Crown>
                                    <Img src ={this.props.STATE.ENDPOINT + '/' + this.props.cfg.crown} />
                                </Style.Crown>
                            </Style.Front>
                        }
                        back={
                            <Style.Back theme={this.props.STATE.THEME} cfg={this.props.cfg} size={this.props.cfg.size} >
                                <Style.Points size={this.props.cfg.size} theme={this.props.STATE.THEME}>
                                    <Text theme={Theme[this.props.STATE.THEME].complement}>{this.props.cfg.name}</Text>
                                </Style.Points>
                            </Style.Back>
                        }
                    />
                </Style.HoverCard>
            </Style.Base>
        )
    }
}