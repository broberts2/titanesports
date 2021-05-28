import React from "react";
import Style from "../style";
import {
	LineChart,
	DoughnutChart,
	Dropdown,
	Text,
	Theme,
} from "arclight-react";

export default class _ extends React.Component {
	state = {
		dropdownValue: "CS Total",
		dropdownLineValue: "CS per Minute",
	};

	modLineData(obj) {
		const data = [{ x: 0, y: 0 }];
		const keys = Object.values(obj).map((el, i) => ({
			x: (i + 1) * 10,
			y: el,
		}));
		return data.concat(keys).sort((a, b) => (a.x < b.x ? -1 : 1));
	}

	renderLineChart() {
		return (
			<div>
				<Style.Dropdown>
					<Dropdown
						defaultValue={"CS per Minute"}
						theme={this.props.STATE.THEME}
						onChange={(e) =>
							this.setState({ dropdownLineValue: e.target.value })
						}
						items={[
							{ component: <div>CS per Minute</div>, value: "CS per Minute" },
							{ component: <div>Kills</div>, value: "Kills" },
							{ component: <div>Deaths</div>, value: "Deaths" },
							{ component: <div>Assists</div>, value: "Assists" },
						]}
					/>
				</Style.Dropdown>
				<h1>{this.state.dropdownLineValue}</h1>
				<LineChart
					theme={this.props.STATE.THEME}
					hideSeriesSelection={false}
					decimal={1}
					showAxis={true}
					showGridLines={false}
					height={325}
					dataTableColumns={4}
					data={{
						[this.props.DATA.teams.blue.players.top.identity.player
							.summonerName]: {
							img: `${this.props.STATE.ENDPOINT}/static/assets/kirbz.png`,
							yAxis: this.state.dropdownLineValue,
							xAxis: "Time (Minutes)",
							data: this.modLineData(
								this.props.DATA.teams.blue.players.top.timeline
									.creepsPerMinDeltas
							),
						},
						[this.props.DATA.teams.blue.players.jungle.identity.player
							.summonerName]: {
							img: `${this.props.STATE.ENDPOINT}/static/assets/kirbz.png`,
							yAxis: this.state.dropdownLineValue,
							xAxis: "Time (Minutes)",
							data: this.modLineData(
								this.props.DATA.teams.blue.players.jungle.timeline
									.creepsPerMinDeltas
							),
						},
						[this.props.DATA.teams.blue.players.middle.identity.player
							.summonerName]: {
							img: `${this.props.STATE.ENDPOINT}/static/assets/kirbz.png`,
							yAxis: this.state.dropdownLineValue,
							xAxis: "Time (Minutes)",
							data: this.modLineData(
								this.props.DATA.teams.blue.players.middle.timeline
									.creepsPerMinDeltas
							),
						},
						[this.props.DATA.teams.blue.players.bottom.identity.player
							.summonerName]: {
							img: `${this.props.STATE.ENDPOINT}/static/assets/kirbz.png`,
							yAxis: this.state.dropdownLineValue,
							xAxis: "Time (Minutes)",
							data: this.modLineData(
								this.props.DATA.teams.blue.players.bottom.timeline
									.creepsPerMinDeltas
							),
						},
						[this.props.DATA.teams.blue.players.support.identity.player
							.summonerName]: {
							img: `${this.props.STATE.ENDPOINT}/static/assets/kirbz.png`,
							yAxis: this.state.dropdownLineValue,
							xAxis: "Time (Minutes)",
							data: this.modLineData(
								this.props.DATA.teams.blue.players.support.timeline
									.creepsPerMinDeltas
							),
						},
						[this.props.DATA.teams.red.players.top.identity.player
							.summonerName]: {
							img: `${this.props.STATE.ENDPOINT}/static/assets/kirbz.png`,
							yAxis: this.state.dropdownLineValue,
							xAxis: "Time (Minutes)",
							data: this.modLineData(
								this.props.DATA.teams.red.players.top.timeline
									.creepsPerMinDeltas
							),
						},
						[this.props.DATA.teams.red.players.jungle.identity.player
							.summonerName]: {
							img: `${this.props.STATE.ENDPOINT}/static/assets/kirbz.png`,
							yAxis: this.state.dropdownLineValue,
							xAxis: "Time (Minutes)",
							data: this.modLineData(
								this.props.DATA.teams.red.players.jungle.timeline
									.creepsPerMinDeltas
							),
						},
						[this.props.DATA.teams.red.players.middle.identity.player
							.summonerName]: {
							img: `${this.props.STATE.ENDPOINT}/static/assets/kirbz.png`,
							yAxis: this.state.dropdownLineValue,
							xAxis: "Time (Minutes)",
							data: this.modLineData(
								this.props.DATA.teams.red.players.middle.timeline
									.creepsPerMinDeltas
							),
						},
						[this.props.DATA.teams.red.players.bottom.identity.player
							.summonerName]: {
							img: `${this.props.STATE.ENDPOINT}/static/assets/kirbz.png`,
							yAxis: this.state.dropdownLineValue,
							xAxis: "Time (Minutes)",
							data: this.modLineData(
								this.props.DATA.teams.red.players.bottom.timeline
									.creepsPerMinDeltas
							),
						},
						[this.props.DATA.teams.red.players.support.identity.player
							.summonerName]: {
							img: `${this.props.STATE.ENDPOINT}/static/assets/kirbz.png`,
							yAxis: this.state.dropdownLineValue,
							xAxis: "Time (Minutes)",
							data: this.modLineData(
								this.props.DATA.teams.red.players.support.timeline
									.creepsPerMinDeltas
							),
						},
					}}
				/>
			</div>
		);
	}

	renderRows(cNum) {
		let row = [];
		let rows = [];
		let i = 0;
		for (let key in this.props.MYDATA.stats) {
			if (i % cNum === 0 && i > 0) {
				rows.push(<tr>{row}</tr>);
				row = [];
			}
			row.push(
				<td>
					<div style={{ margin: "20px" }}>
						<h3>{key}</h3>
						<div>{`${this.props.MYDATA.stats[key]}`}</div>
					</div>
				</td>
			);
			i++;
		}
		return rows;
	}

	dChart(unit) {
		const _ = () => {
			switch (this.state.dropdownValue) {
				case "CS Total":
					return "totalMinionsKilled";
				case "CS Total":
					return "totalMinionsKilled";
				case "CS Total":
					return "totalMinionsKilled";
				case "CS Total":
					return "totalMinionsKilled";
				case "CS Total":
					return "totalMinionsKilled";
				case "CS Total":
					return "totalMinionsKilled";
				case "CS Total":
					return "totalMinionsKilled";
				case "CS Total":
					return "totalMinionsKilled";
			}
		};
		const key = _();
		return (
			<div style={{ display: "inline-block", verticalAlign: "top" }}>
				<Style.Dropdown>
					<Dropdown
						defaultValue={"CS Total"}
						theme={this.props.STATE.THEME}
						onChange={(e) => this.setState({ dropdownValue: e.target.value })}
						items={[
							{
								component: <div>CS Total</div>,
								value: "CS Total",
							},
							{ component: <div>Kills</div>, value: "Kills" },
							{ component: <div>Deaths</div>, value: "Deaths" },
							{ component: <div>Assists</div>, value: "Assists" },
							{ component: <div>Vision Score</div>, value: "Vision Score" },
							{ component: <div>Damage Done</div>, value: "Damage Done" },
							{ component: <div>Gold Earned</div>, value: "Gold Earned" },
						]}
					/>
				</Style.Dropdown>
				<h1>{unit}</h1>
				<DoughnutChart
					hideSeriesSelection={false}
					theme={Theme[this.props.STATE.THEME].complement}
					defaultUnit={unit}
					data={{
						[this.props.DATA.teams.blue.players.top.identity.player
							.summonerName]: {
							value: this.props.DATA.teams.blue.players.top.stats[key],
							img: `${this.props.STATE.ENDPOINT}/static/assets/kirbz.png`,
						},
						[this.props.DATA.teams.blue.players.jungle.identity.player
							.summonerName]: {
							value: this.props.DATA.teams.blue.players.jungle.stats[key],
							img: `${this.props.STATE.ENDPOINT}/static/assets/kirbz.png`,
						},
						[this.props.DATA.teams.blue.players.middle.identity.player
							.summonerName]: {
							value: this.props.DATA.teams.blue.players.middle.stats[key],
							img: `${this.props.STATE.ENDPOINT}/static/assets/kirbz.png`,
						},
						[this.props.DATA.teams.blue.players.bottom.identity.player
							.summonerName]: {
							value: this.props.DATA.teams.blue.players.bottom.stats[key],
							img: `${this.props.STATE.ENDPOINT}/static/assets/kirbz.png`,
						},
						[this.props.DATA.teams.blue.players.support.identity.player
							.summonerName]: {
							value: this.props.DATA.teams.blue.players.support.stats[key],
							img: `${this.props.STATE.ENDPOINT}/static/assets/kirbz.png`,
						},
						[this.props.DATA.teams.red.players.top.identity.player
							.summonerName]: {
							value: this.props.DATA.teams.red.players.top.stats[key],
							img: `${this.props.STATE.ENDPOINT}/static/assets/kirbz.png`,
						},
						[this.props.DATA.teams.red.players.jungle.identity.player
							.summonerName]: {
							value: this.props.DATA.teams.red.players.jungle.stats[key],
							img: `${this.props.STATE.ENDPOINT}/static/assets/kirbz.png`,
						},
						[this.props.DATA.teams.red.players.middle.identity.player
							.summonerName]: {
							value: this.props.DATA.teams.red.players.middle.stats[key],
							img: `${this.props.STATE.ENDPOINT}/static/assets/kirbz.png`,
						},
						[this.props.DATA.teams.red.players.bottom.identity.player
							.summonerName]: {
							value: this.props.DATA.teams.red.players.bottom.stats[key],
							img: `${this.props.STATE.ENDPOINT}/static/assets/kirbz.png`,
						},
						[this.props.DATA.teams.red.players.support.identity.player
							.summonerName]: {
							value: this.props.DATA.teams.red.players.support.stats[key],
							img: `${this.props.STATE.ENDPOINT}/static/assets/kirbz.png`,
						},
					}}
					radius={225}
					width={30}
					padAngle={2}
				/>
			</div>
		);
	}

	render() {
		console.log(this.props.DATA);
		return (
			<Style.Table>
				<table style={{ width: "100%" }}>
					<tbody>
						<tr>
							<td valign="top">{this.dChart(this.state.dropdownValue)}</td>
							<td>{this.renderLineChart()}</td>
						</tr>
					</tbody>
				</table>
				<table style={{ width: "100%" }}>
					<tbody>{this.renderRows(5)}</tbody>
				</table>
			</Style.Table>
		);
	}
}
