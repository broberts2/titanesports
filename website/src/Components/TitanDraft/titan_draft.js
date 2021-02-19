import React from "react";
import Style from "./style";
import { Theme, Text, Transition, Dropdown, Button } from "arclight-react";

export default class _ extends React.Component {
	async componentDidMount() {
		const teams = await this.props.STATE.GLOBAL_METHODS.doAction(
			null,
			"get",
			"/Team/get_all_teams"
		);
		this.setState({ teams });
	}

	interface() {
		const _ = (teamNumber) => (
			<Style.InterfaceBlock>
				<Style.InterfaceDropdownTitle>
					<Text theme={this.props.STATE.THEME}>{`Team ${teamNumber + 1} (${
						teamNumber ? "Red" : "Blue"
					})`}</Text>
				</Style.InterfaceDropdownTitle>
				<Dropdown
					theme={Theme[this.props.STATE.THEME].complement}
					onChange={(e) =>
						this.setState({ [`Team_${teamNumber + 1}`]: e.target.value })
					}
					items={this.state.teams.map((el) => ({
						component: (
							<div style={{ fontSize: "1vw", margin: "20px" }}>{el.name}</div>
						),
						value: el,
					}))}
				/>
			</Style.InterfaceBlock>
		);
		return (
			<Style.Interface>
				{_(0)}
				{_(1)}
				<div
					style={{
						opacity: this.state.Team_1 && this.state.Team_2 ? 1 : 0.25,
						pointerEvents:
							this.state.Team_1 && this.state.Team_2 ? "all" : "none",
					}}
				>
					<Style.InterfaceBlock>
						<Button
							trans={{ animation: "fadeInRight", delay: 0.5 }}
							theme={Theme[this.props.STATE.THEME].complement}
							pop
							onClick={async () => {
								const res = await this.props.STATE.GLOBAL_METHODS.doAction(
									{
										TEAM_1: {
											LOGO: this.state.Team_1.logo,
											NAME: this.state.Team_1.name,
										},
										TEAM_2: {
											LOGO: this.state.Team_2.logo,
											NAME: this.state.Team_2.name,
										},
									},
									"post",
									`/TitanDraft/post`
								);
								if (res) {
									this.props.STATE.GLOBAL_METHODS.setTitanDraft(res);
									this.props.STATE.GLOBAL_METHODS.showModal("TitanDraft");
								}
							}}
						>
							<div style={{ width: "50vw" }}>Create</div>
						</Button>
					</Style.InterfaceBlock>
				</div>
			</Style.Interface>
		);
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
								Titan Draft
							</Text>
						</Style.PageTitle>
						<div style={{ width: "100%", textAlign: "center" }}>
							<Style.Orb
								borderColor={
									Theme[Theme[this.props.STATE.THEME].complement]
										.backgroundColor
								}
							>
								<video
									src={`${this.props.STATE.ENDPOINT}/static/videos/odyssey-login.webm`}
									autoPlay
									muted
									loop
								/>
							</Style.Orb>
						</div>
						<Style.Panel>
							<Transition
								trans={{
									animation: this.props.STATE.pageFading
										? "fadeOutRight"
										: "fadeInLeft",
								}}
							>
								<Style.PanelBlurb>
									<Text theme={this.props.STATE.THEME}>
										Welcome to our in-house 'Prodraft' utility! Titan Esports
										has created our very own drafting tool for use in all
										leagues. Our drafting software features all of the standard
										functions present within the popular{" "}
										<a
											href={"http://prodraft.leagueoflegends.com"}
											target={"_blank"}
										>
											Prodraft
										</a>{" "}
										utility, in addition to some other streamer-friendly
										functionality. Users will be able to view drafts already in
										progress as well as view draft replays with the precise time
										with which champions were drafted. We also have a feature
										where replays may be viewed as a hastened 2-minute playback
										- ideal for streamers on a timeline. Use the interface below
										to generate a draft using our existing teams!
									</Text>
								</Style.PanelBlurb>
							</Transition>
						</Style.Panel>
						{this.interface()}
					</React.Fragment>
				) : null}
			</Style.Base>
		);
	}
}
