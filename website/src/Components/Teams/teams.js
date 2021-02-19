import React from "react";
import Style from "./style";
import { Img, Transition, Theme, Text, DiamondDivider } from "arclight-react";
import Components from "../components";

export default class _ extends React.Component {
	async componentDidMount() {
		const teams = await fetch(
			`${this.props.STATE.ENDPOINT}/Team/get_all_teams`
		).then((res) => res.json());
		console.log(teams);
		this.setState({ teams });
	}

	teamRow(data) {
		return (
			<Style.TeamRow>
				<Style.TeamRowContent
					onClick={() =>
						this.props.STATE.GLOBAL_METHODS.setURL(`/team?id=${data._id}`)
					}
					backgroundColor={`${
						Theme[Theme[this.props.STATE.THEME].complement].backgroundColor
					}`}
				>
					<Style.TeamRowTitle>
						<Text
							trans={{
								animation: this.props.STATE.pageFading
									? "fadeOutRight"
									: "fadeInRight",
							}}
							theme={Theme[this.props.STATE.THEME].complement}
						>
							{data.name}
						</Text>
					</Style.TeamRowTitle>
					<Style.TeamRowPositionImg
						backgroundColor={`${
							Theme[Theme[this.props.STATE.THEME].complement].backgroundColor
						}`}
						borderColor={`${Theme[this.props.STATE.THEME].backgroundColor}`}
					>
						<Img src={`${this.props.STATE.ENDPOINT}/${data.logo}`} />
					</Style.TeamRowPositionImg>
				</Style.TeamRowContent>
			</Style.TeamRow>
		);
	}

	listTeams() {
		return this.state.teams.map((team) => this.teamRow(team));
	}

	render() {
		return (
			<Style.Base>
				{this.state ? (
					<React.Fragment>
						<Style.PageTitle>
							<Text
								trans={{
									animation: this.props.STATE.pageFading
										? "fadeOutLeft"
										: "fadeInLeft",
								}}
								theme={this.props.STATE.THEME}
							>
								Teams and Orgs
							</Text>
						</Style.PageTitle>
						<Style.Banner>
							<Img
								trans={{
									animation: this.props.STATE.pageFading ? "zoomOut" : "zoomIn",
								}}
								src={`${this.props.STATE.ENDPOINT}/static/assets/ahri.png`}
							/>
						</Style.Banner>
						<Style.TeamsTitle>
							<Text
								theme={this.props.STATE.THEME}
								trans={{
									animation: this.props.STATE.pageFading
										? "fadeOutRight"
										: "fadeInRight",
								}}
							>
								Teams
							</Text>
						</Style.TeamsTitle>
						{this.listTeams()}
					</React.Fragment>
				) : null}
			</Style.Base>
		);
	}
}
