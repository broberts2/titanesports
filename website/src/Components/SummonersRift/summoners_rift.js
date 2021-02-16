import React from "react";
import Style from "./style";
import { Img, Theme } from "arclight-react";

export default class _ extends React.Component {
	parsePosImg(i) {
		switch (i) {
			case "top":
				return `${this.props.STATE.ENDPOINT}/static/assets/pos_top.png`;
			case "jungle":
				return `${this.props.STATE.ENDPOINT}/static/assets/pos_jungle.png`;
			case "middle":
				return `${this.props.STATE.ENDPOINT}/static/assets/pos_mid.png`;
			case "bottom":
				return `${this.props.STATE.ENDPOINT}/static/assets/pos_bottom.png`;
			case "support":
				return `${this.props.STATE.ENDPOINT}/static/assets/pos_support.png`;
		}
	}

	pin(p, c, i) {
		return (
			<Style.Pin c={c}>
				<Style.PinBase>
					<Img
						style={{
							filter:
								Theme[Theme[this.props.STATE.THEME].complement]
									.backgroundFilter,
						}}
						src={`${this.props.STATE.ENDPOINT}/static/assets/pin.png`}
					/>
				</Style.PinBase>
				<Style.PinUserImg>
					<Img src={i} />
				</Style.PinUserImg>
				<Style.PositionImg
					backgroundColor={
						Theme[Theme[this.props.STATE.THEME].complement].backgroundColor
					}
				>
					<Img src={this.parsePosImg(p)} />
				</Style.PositionImg>
			</Style.Pin>
		);
	}

	render() {
		return (
			<Style.Base>
				<Style.BaseImg>
					<Img
						src={`${this.props.STATE.ENDPOINT}/static/assets/summoners_rift.jpg`}
					/>
					{this.pin(
						"top",
						{ x: "29%", y: "-4%" },
						this.props.data.top.avatarUrl
					)}
					{this.pin(
						"jungle",
						{ x: "35%", y: "20%" },
						this.props.data.jungle.avatarUrl
					)}
					{this.pin(
						"middle",
						{ x: "47.5%", y: "20%" },
						this.props.data.mid.avatarUrl
					)}
					{this.pin(
						"bottom",
						{ x: "65%", y: "50%" },
						this.props.data.bottom.avatarUrl
					)}
					{this.pin(
						"support",
						{ x: "75%", y: "60%" },
						this.props.data.support.avatarUrl
					)}
				</Style.BaseImg>
			</Style.Base>
		);
	}
}
