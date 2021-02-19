import React from "react";
import Style from "./style";
import { Img, Transition, Theme, Text } from "arclight-react";
import Components from "../components";

export default class _ extends React.Component {
	parsePos(i) {
		switch (i) {
			case "top":
				return {
					text: `Top Lane`,
					img: `${this.props.STATE.ENDPOINT}/static/assets/pos_top.png`,
				};
			case "jungle":
				return {
					text: `Jungle`,
					img: `${this.props.STATE.ENDPOINT}/static/assets/pos_jungle.png`,
				};
			case "middle":
				return {
					text: `Mid Lane`,
					img: `${this.props.STATE.ENDPOINT}/static/assets/pos_mid.png`,
				};
			case "bottom":
				return {
					text: `Bot Lane`,
					img: `${this.props.STATE.ENDPOINT}/static/assets/pos_bottom.png`,
				};
			case "support":
				return {
					text: `Support`,
					img: `${this.props.STATE.ENDPOINT}/static/assets/pos_support.png`,
				};
			case "sub":
				return {
					text: `Sub`,
					img: `${this.props.STATE.ENDPOINT}/static/assets/pos_sub.png`,
				};
		}
	}

	memberRow(data) {
		return (
			<Style.MemberRow>
				<Style.MemberRowContent
					onClick={() =>
						window.open(`/account?user=${data.member.id}`, "_blank")
					}
					backgroundColor={`${
						Theme[Theme[this.props.STATE.THEME].complement].backgroundColor
					}`}
				>
					<Style.MemberRowTitle>
						<Text
							trans={{
								animation: this.props.STATE.pageFading
									? "fadeOutRight"
									: "fadeInRight",
							}}
							theme={Theme[this.props.STATE.THEME].complement}
						>
							{data.member.nickname}
						</Text>
					</Style.MemberRowTitle>
					<Style.MemberRowPosition>
						<Text
							trans={{
								animation: this.props.STATE.pageFading
									? "fadeOutRight"
									: "fadeInRight",
							}}
							theme={Theme[this.props.STATE.THEME].complement}
						>
							{this.parsePos(data.pos).text}
						</Text>
					</Style.MemberRowPosition>
					<Style.MemberRowPositionImg
						backgroundColor={`${
							Theme[Theme[this.props.STATE.THEME].complement].backgroundColor
						}`}
						borderColor={`${Theme[this.props.STATE.THEME].backgroundColor}`}
					>
						<Img src={this.parsePos(data.pos).img} />
					</Style.MemberRowPositionImg>
				</Style.MemberRowContent>
			</Style.MemberRow>
		);
	}

	listMembers(arr) {
		return arr.map((el) => this.memberRow(el));
	}

	spawnBadges(badges) {
		let row = [];
		let rows = [];
		let n = 7;
		badges.map((el, i) => {
			if (i % n === 0 && i > 0) {
				rows.push(<tr>{row}</tr>);
				row = [];
			}
			row.push(
				<td align={"center"} style={{ padding: "1vw" }}>
					{el}
				</td>
			);
		});
		if (row.length > 0) {
			for (let i = row.length; i < n; i++) {
				row.push(<td />);
			}
			rows.push(row);
		}
		return (
			<table>
				<tbody>{rows}</tbody>
			</table>
		);
	}

	async componentDidMount() {
		const params = {};
		window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => {
			params[key] = value;
		});
		const team = await this.props.STATE.GLOBAL_METHODS.doAction(
			null,
			"get",
			`/Team/get_team_by_id?id=${params.id}`
		);
		const badges = team.badges
			? await this.props.STATE.GLOBAL_METHODS.getBadgeBatch("7vw", team.badges)
			: [];
		this.setState({
			badges: badges.map((el) => el.component),
			name: team.name,
			banner: team.banner,
			logo: team.logo,
			members: [
				{ member: team.memberTop, pos: "top" },
				{ member: team.memberJungle, pos: "jungle" },
				{ member: team.memberMiddle, pos: "middle" },
				{ member: team.memberBottom, pos: "bottom" },
				{ member: team.memberSupport, pos: "support" },
			].concat(team.subs.map((sub) => ({ member: sub, pos: "sub" }))),
		});
	}

	render() {
		return (
			<Style.Base>
				{this.state ? (
					<React.Fragment>
						<Style.Banner
							lineColor={
								Theme[Theme[this.props.STATE.THEME].complement].backgroundColor
							}
						>
							<Style.BannerBGImg>
								<Img
									trans={{
										animation: this.props.STATE.pageFading
											? "fadeOut"
											: "fadeIn",
									}}
									src={`${this.props.STATE.ENDPOINT}/${
										this.state.teamBanner
											? this.state.teamBanner
											: "static/team_banners/default.png"
									}`}
								/>
							</Style.BannerBGImg>
							<Transition
								trans={{
									animation: this.props.STATE.pageFading
										? "fadeOutLeft"
										: "fadeInLeft",
								}}
							>
								<Style.BannerTeamImg
									backgroundColor={
										Theme[Theme[this.props.STATE.THEME].complement]
											.backgroundColor
									}
									lineColor={
										Theme[Theme[this.props.STATE.THEME].complement]
											.backgroundColor
									}
								>
									<Img
										src={`${this.props.STATE.ENDPOINT}/${
											this.state.teamLogo
												? this.state.teamLogo
												: "static/team_logos/default.png"
										}`}
									/>
								</Style.BannerTeamImg>
							</Transition>
						</Style.Banner>
						<Style.TitlePrimary>
							<Text
								trans={{
									animation: this.props.STATE.pageFading
										? "fadeOutRight"
										: "fadeInRight",
								}}
								theme={this.props.STATE.THEME}
							>
								{this.state.name}
							</Text>
						</Style.TitlePrimary>
						<Style.SummonersRift>
							<div
								style={{
									width: "50vw",
									minWidth: "500px",
									display: "inline-block",
								}}
							>
								<Components.SummonersRift
									data={{
										top: this.state.members[0].member,
										jungle: this.state.members[1].member,
										mid: this.state.members[2].member,
										bottom: this.state.members[3].member,
										support: this.state.members[4].member,
									}}
									STATE={this.props.STATE}
								/>
							</div>
						</Style.SummonersRift>
						{this.state.badges.length > 0 ? (
							<Style.Badges>{this.spawnBadges(this.state.badges)}</Style.Badges>
						) : null}
						<Style.MembersTitle>
							<Text
								theme={this.props.STATE.THEME}
								trans={{
									animation: this.props.STATE.pageFading
										? "fadeOutRight"
										: "fadeInRight",
								}}
							>
								Members
							</Text>
						</Style.MembersTitle>
						{this.listMembers(this.state.members)}
					</React.Fragment>
				) : null}
			</Style.Base>
		);
	}
}
