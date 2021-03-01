import React from "react";
import Style from "./style";
import Utils from "./utils";

export default class _ extends React.Component {
	async componentDidMount() {
		const teams = await this.props.STATE.GLOBAL_METHODS.doAction(
			null,
			"get",
			"/Team/get_all_teams"
		);
		this.setState({
			teams,
			team1: teams[0].name,
			team2: teams[0].name,
			mapType: "SUMMONERS_RIFT",
			pickType: "TOURNAMENT_DRAFT",
			spectatorType: "ALL",
			teamSize: 5,
			weekNum: 1,
			seasonNum: 6,
			league: "Divinity",
			codeCount: 3,
		});
	}

	modify(key, value) {
		this.setState({ [key]: value });
	}

	render() {
		return (
			<Style.Base>
				{this.state ? (
					!this.state.res ? (
						<React.Fragment>
							<Utils.Intro
								STATE={this.props.STATE}
								title={"Tournament Codes"}
								description={"Generates tournament codes!"}
							/>
							<Utils.Dropdown
								STATE={this.props.STATE}
								title={"Select Team 1"}
								items={this.state.teams.map((el) => el.name)}
								onChange={(value) => this.modify("team1", value)}
							/>
							<Utils.Dropdown
								STATE={this.props.STATE}
								title={"Select Team 2"}
								items={this.state.teams.map((el) => el.name)}
								onChange={(value) => this.modify("team2", value)}
							/>
							<Utils.Dropdown
								STATE={this.props.STATE}
								title={"Week Number"}
								items={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]}
								onChange={(value) => this.modify("weekNum", value)}
							/>
							<Utils.Dropdown
								STATE={this.props.STATE}
								title={"Season Number"}
								items={[6]}
								onChange={(value) => this.modify("seasonNum", value)}
							/>
							<Utils.Dropdown
								STATE={this.props.STATE}
								title={"Map Type"}
								items={["SUMMONERS_RIFT", "TWISTED_TREELINE", "HOWLING_ABYSS"]}
								onChange={(value) => this.modify("mapType", value)}
							/>
							<Utils.Dropdown
								STATE={this.props.STATE}
								title={"Pick Type"}
								items={[
									"TOURNAMENT_DRAFT",
									"BLIND_PICK",
									"DRAFT_MODE",
									"ALL_RANDOM",
								]}
								onChange={(value) => this.modify("pickType", value)}
							/>
							<Utils.Dropdown
								STATE={this.props.STATE}
								title={"Spectator Type"}
								items={["ALL", "LOBBYONLY", "NONE"]}
								onChange={(value) => this.modify("spectatorType", value)}
							/>
							<Utils.Dropdown
								STATE={this.props.STATE}
								title={"Team Size"}
								items={[5, 4, 3, 2, 1]}
								onChange={(value) => this.modify("teamSize", value)}
							/>
							<Utils.Dropdown
								STATE={this.props.STATE}
								title={"Code Count"}
								items={[3, 5, 7, 1]}
								onChange={(value) => this.modify("codeCount", value)}
							/>
							<Utils.Execute
								STATE={this.props.STATE}
								isValid={true}
								cb={async () => {
									const result = await this.props.STATE.GLOBAL_METHODS.doAction(
										this.state,
										"post",
										`/Oracle/create_tournament_codes`
									);
									if (result.msg === "Success!") {
										alert("Code generation successful!");
										this.setState({
											res: `${result.data.team1} vs ${
												result.data.team2
											}\n\n${result.data.codes.join("\n")}`,
										});
									} else {
										alert(`Failed to generate codes. ${result.msg}`);
									}
								}}
							/>
						</React.Fragment>
					) : (
						<Utils.ReadOnlyText
							STATE={this.props.STATE}
							value={this.state.res}
						/>
					)
				) : null}
			</Style.Base>
		);
	}
}
