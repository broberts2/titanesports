import React from "react";
import Style from "./style";
import { Text, Img } from "arclight-react";
import Tables from "./tables/index";

export default class _ extends React.Component {
	async componentDidMount() {
		const gameData = await this.props.STATE.GLOBAL_METHODS.doAction(
			{},
			"post",
			"/GameData/query"
		).then((res) => res[0]);
		const team1 = await this.props.STATE.GLOBAL_METHODS.doAction(
			null,
			"get",
			`/Team/get_team_by_id?id=${gameData.teams.blue.discordId}`
		);
		const team2 = await this.props.STATE.GLOBAL_METHODS.doAction(
			null,
			"get",
			`/Team/get_team_by_id?id=${gameData.teams.red.discordId}`
		);
		gameData.teams.blue.name = team1.name;
		gameData.teams.red.name = team2.name;
		this.setState({ gameData });
		console.log(this.state);
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
								Statistics
							</Text>
						</Style.PageTitle>
						<Style.Banner>
							<Img
								trans={{
									animation: this.props.STATE.pageFading ? "zoomOut" : "zoomIn",
								}}
								src={
									this.props.STATE.ENDPOINT +
									"/" +
									"static/assets/project-lucian.png"
								}
							/>
						</Style.Banner>
						<Style.PanelTitle>
							<Text
								trans={{
									animation: this.props.STATE.pageFading
										? "fadeOutLeft"
										: "fadeInRight",
								}}
								theme={this.props.STATE.THEME}
							>
								Filters
							</Text>
						</Style.PanelTitle>
						<Tables.Players
							STATE={this.props.STATE}
							DATA={this.state.gameData}
						/>
					</React.Fragment>
				) : null}
			</Style.Base>
		);
	}
}
