import React from "react";
import Style from "../style";
import { Table, Theme } from "arclight-react";
import Tables from "./index";

export default class _ extends React.Component {
	row1() {
		return [
			{
				id: "team",
				label: "Team",
			},
			{
				id: "position",
				label: "Position",
			},
			{
				id: "cs",
				label: "Creep Score",
			},
			{
				id: "kills",
				label: "Kills",
			},
			{
				id: "deaths",
				label: "Deaths",
			},
			{
				id: "assists",
				label: "Assists",
			},
			{
				id: "vs",
				label: "Vision Score",
			},
			{
				id: "ddtc",
				label: "Damage Dealt to Champions",
			},
			{
				id: "ge",
				label: "Gold Earned",
			},
		];
	}

	row1Stats(summoner, position, cs, kills, deaths, assists, vs, ddtc, ge) {
		return {
			summoner,
			position,
			cs,
			kills,
			deaths,
			assists,
			vs,
			ddtc,
			ge,
		};
	}

	statLineObj(obj1, obj2, collapse) {
		return Object.assign(obj1, obj2, { __collapse__: collapse });
	}

	fillRow(arr) {
		return arr.map((obj) => ({
			id: obj.id,
			numeric: true,
			disablePadding: true,
			label: obj.label,
		}));
	}

	render() {
		return (
			<Style.Table>
				<Table
					search={"75%"}
					animation={"fadeInLeft"}
					theme={Theme[this.props.STATE.THEME].complement}
					title={"Roster"}
					headCells={[
						{
							id: "name",
							numeric: false,
							disablePadding: true,
							label: "Summoner",
						},
					].concat(this.fillRow(this.row1()))}
					rows={[
						this.statLineObj(
							{
								name: this.props.DATA.teams.blue.players.top.identity.player
									.summonerName,
							},
							this.row1Stats(
								this.props.DATA.teams.blue.name,
								"Top",
								this.props.DATA.teams.blue.players.top.stats.totalMinionsKilled,
								this.props.DATA.teams.blue.players.top.stats.kills,
								this.props.DATA.teams.blue.players.top.stats.deaths,
								this.props.DATA.teams.blue.players.top.stats.assists,
								this.props.DATA.teams.blue.players.top.stats.visionScore,
								this.props.DATA.teams.blue.players.top.stats
									.totalDamageDealtToChampions,
								this.props.DATA.teams.blue.players.top.stats.goldEarned
							),
							<Tables.Stats
								DATA={this.props.DATA}
								MYDATA={this.props.DATA.teams.blue.players.top}
								STATE={this.props.STATE}
							/>
						),
						this.statLineObj(
							{
								name: this.props.DATA.teams.blue.players.jungle.identity.player
									.summonerName,
							},
							this.row1Stats(
								this.props.DATA.teams.blue.name,
								"Jungle",
								this.props.DATA.teams.blue.players.jungle.stats
									.totalMinionsKilled,
								this.props.DATA.teams.blue.players.jungle.stats.kills,
								this.props.DATA.teams.blue.players.jungle.stats.deaths,
								this.props.DATA.teams.blue.players.jungle.stats.assists,
								this.props.DATA.teams.blue.players.jungle.stats.visionScore,
								this.props.DATA.teams.blue.players.jungle.stats
									.totalDamageDealtToChampions,
								this.props.DATA.teams.blue.players.jungle.stats.goldEarned
							),
							<Tables.Stats
								DATA={this.props.DATA}
								MYDATA={this.props.DATA.teams.blue.players.jungle}
								STATE={this.props.STATE}
							/>
						),
						this.statLineObj(
							{
								name: this.props.DATA.teams.blue.players.middle.identity.player
									.summonerName,
							},
							this.row1Stats(
								this.props.DATA.teams.blue.name,
								"Middle",
								this.props.DATA.teams.blue.players.middle.stats
									.totalMinionsKilled,
								this.props.DATA.teams.blue.players.middle.stats.kills,
								this.props.DATA.teams.blue.players.middle.stats.deaths,
								this.props.DATA.teams.blue.players.middle.stats.assists,
								this.props.DATA.teams.blue.players.middle.stats.visionScore,
								this.props.DATA.teams.blue.players.middle.stats
									.totalDamageDealtToChampions,
								this.props.DATA.teams.blue.players.middle.stats.goldEarned
							),
							<Tables.Stats
								DATA={this.props.DATA}
								MYDATA={this.props.DATA.teams.blue.players.middle}
								STATE={this.props.STATE}
							/>
						),
						this.statLineObj(
							{
								name: this.props.DATA.teams.blue.players.bottom.identity.player
									.summonerName,
							},
							this.row1Stats(
								this.props.DATA.teams.blue.name,
								"Bottom",
								this.props.DATA.teams.blue.players.bottom.stats
									.totalMinionsKilled,
								this.props.DATA.teams.blue.players.bottom.stats.kills,
								this.props.DATA.teams.blue.players.bottom.stats.deaths,
								this.props.DATA.teams.blue.players.bottom.stats.assists,
								this.props.DATA.teams.blue.players.bottom.stats.visionScore,
								this.props.DATA.teams.blue.players.bottom.stats
									.totalDamageDealtToChampions,
								this.props.DATA.teams.blue.players.bottom.stats.goldEarned
							),
							<Tables.Stats
								DATA={this.props.DATA}
								MYDATA={this.props.DATA.teams.blue.players.bottom}
								STATE={this.props.STATE}
							/>
						),
						this.statLineObj(
							{
								name: this.props.DATA.teams.blue.players.support.identity.player
									.summonerName,
							},
							this.row1Stats(
								this.props.DATA.teams.blue.name,
								"Support",
								this.props.DATA.teams.blue.players.support.stats
									.totalMinionsKilled,
								this.props.DATA.teams.blue.players.support.stats.kills,
								this.props.DATA.teams.blue.players.support.stats.deaths,
								this.props.DATA.teams.blue.players.support.stats.assists,
								this.props.DATA.teams.blue.players.support.stats.visionScore,
								this.props.DATA.teams.blue.players.support.stats
									.totalDamageDealtToChampions,
								this.props.DATA.teams.blue.players.support.stats.goldEarned
							),
							<Tables.Stats
								DATA={this.props.DATA}
								MYDATA={this.props.DATA.teams.blue.players.support}
								STATE={this.props.STATE}
							/>
						),
						this.statLineObj(
							{
								name: this.props.DATA.teams.red.players.top.identity.player
									.summonerName,
							},
							this.row1Stats(
								this.props.DATA.teams.red.name,
								"Top",
								this.props.DATA.teams.red.players.top.stats.totalMinionsKilled,
								this.props.DATA.teams.red.players.top.stats.kills,
								this.props.DATA.teams.red.players.top.stats.deaths,
								this.props.DATA.teams.red.players.top.stats.assists,
								this.props.DATA.teams.red.players.top.stats.visionScore,
								this.props.DATA.teams.red.players.top.stats
									.totalDamageDealtToChampions,
								this.props.DATA.teams.red.players.top.stats.goldEarned
							),
							<Tables.Stats
								DATA={this.props.DATA}
								MYDATA={this.props.DATA.teams.red.players.top}
								STATE={this.props.STATE}
							/>
						),
						this.statLineObj(
							{
								name: this.props.DATA.teams.red.players.jungle.identity.player
									.summonerName,
							},
							this.row1Stats(
								this.props.DATA.teams.red.name,
								"Jungle",
								this.props.DATA.teams.red.players.jungle.stats
									.totalMinionsKilled,
								this.props.DATA.teams.red.players.jungle.stats.kills,
								this.props.DATA.teams.red.players.jungle.stats.deaths,
								this.props.DATA.teams.red.players.jungle.stats.assists,
								this.props.DATA.teams.red.players.jungle.stats.visionScore,
								this.props.DATA.teams.red.players.jungle.stats
									.totalDamageDealtToChampions,
								this.props.DATA.teams.red.players.jungle.stats.goldEarned
							),
							<Tables.Stats
								DATA={this.props.DATA}
								MYDATA={this.props.DATA.teams.red.players.jungle}
								STATE={this.props.STATE}
							/>
						),
						this.statLineObj(
							{
								name: this.props.DATA.teams.red.players.middle.identity.player
									.summonerName,
							},
							this.row1Stats(
								this.props.DATA.teams.red.name,
								"Middle",
								this.props.DATA.teams.red.players.middle.stats
									.totalMinionsKilled,
								this.props.DATA.teams.red.players.middle.stats.kills,
								this.props.DATA.teams.red.players.middle.stats.deaths,
								this.props.DATA.teams.red.players.middle.stats.assists,
								this.props.DATA.teams.red.players.middle.stats.visionScore,
								this.props.DATA.teams.red.players.middle.stats
									.totalDamageDealtToChampions,
								this.props.DATA.teams.red.players.middle.stats.goldEarned
							),
							<Tables.Stats
								DATA={this.props.DATA}
								MYDATA={this.props.DATA.teams.red.players.middle}
								STATE={this.props.STATE}
							/>
						),
						this.statLineObj(
							{
								name: this.props.DATA.teams.red.players.bottom.identity.player
									.summonerName,
							},
							this.row1Stats(
								this.props.DATA.teams.red.name,
								"Bottom",
								this.props.DATA.teams.red.players.bottom.stats
									.totalMinionsKilled,
								this.props.DATA.teams.red.players.bottom.stats.kills,
								this.props.DATA.teams.red.players.bottom.stats.deaths,
								this.props.DATA.teams.red.players.bottom.stats.assists,
								this.props.DATA.teams.red.players.bottom.stats.visionScore,
								this.props.DATA.teams.red.players.bottom.stats
									.totalDamageDealtToChampions,
								this.props.DATA.teams.red.players.bottom.stats.goldEarned
							),
							<Tables.Stats
								DATA={this.props.DATA}
								MYDATA={this.props.DATA.teams.red.players.bottom}
								STATE={this.props.STATE}
							/>
						),
						this.statLineObj(
							{
								name: this.props.DATA.teams.red.players.support.identity.player
									.summonerName,
							},
							this.row1Stats(
								this.props.DATA.teams.red.name,
								"Support",
								this.props.DATA.teams.red.players.support.stats
									.totalMinionsKilled,
								this.props.DATA.teams.red.players.support.stats.kills,
								this.props.DATA.teams.red.players.support.stats.deaths,
								this.props.DATA.teams.red.players.support.stats.assists,
								this.props.DATA.teams.red.players.support.stats.visionScore,
								this.props.DATA.teams.red.players.support.stats
									.totalDamageDealtToChampions,
								this.props.DATA.teams.red.players.support.stats.goldEarned
							),
							<Tables.Stats
								DATA={this.props.DATA}
								MYDATA={this.props.DATA.teams.red.players.support}
								STATE={this.props.STATE}
							/>
						),
					]}
				/>
			</Style.Table>
		);
	}
}
