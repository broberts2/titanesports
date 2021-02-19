import React from "react";
import Style from "./style";
import { Img, Theme } from "arclight-react";

export default class _ extends React.Component {
	state = { ignoreBaseClick: false };

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

	pin(p, c, i, id) {
		return (
			<Style.Pin
				c={c}
				onClick={() => {
					this.state.ignoreBaseClick = true;
					window.open(`/account?user=${id}`, "_blank");
					setTimeout(() => (this.state.ignoreBaseClick = false), 1);
				}}
			>
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
					<Img
						src={
							i
								? i
								: `${this.props.STATE.ENDPOINT}/static/profile_imgs/default.png`
						}
					/>
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

	multiOpGG() {
		let query = "https://na.op.gg/multi_old/query=";
		const members = Object.values(this.props.data)
			.filter((el) => (el.summonerName ? el : null))
			.map((el) => el.summonerName)
			.join("%2");
		if (!this.state.ignoreBaseClick)
			window.open(`${query}${members}`, "_blank");
	}

	render() {
		return (
			<Style.Base>
				<Style.BaseImg onClick={() => this.multiOpGG()}>
					<Img
						src={`${this.props.STATE.ENDPOINT}/static/assets/summoners_rift.jpg`}
					/>
					{this.pin(
						"top",
						{ x: "29%", y: "-4%" },
						this.props.data.top.profileIcon,
						this.props.data.top.id
					)}
					{this.pin(
						"jungle",
						{ x: "35%", y: "20%" },
						this.props.data.jungle.profileIcon,
						this.props.data.jungle.id
					)}
					{this.pin(
						"middle",
						{ x: "47.5%", y: "20%" },
						this.props.data.mid.profileIcon,
						this.props.data.mid.id
					)}
					{this.pin(
						"bottom",
						{ x: "65%", y: "50%" },
						this.props.data.bottom.profileIcon,
						this.props.data.bottom.id
					)}
					{this.pin(
						"support",
						{ x: "75%", y: "60%" },
						this.props.data.support.profileIcon,
						this.props.data.support.id
					)}
				</Style.BaseImg>
			</Style.Base>
		);
	}
}
