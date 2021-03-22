import React from "react";
import Style from "../style";
import { Table, Theme } from "arclight-react";
import Tables from "./index";

export default class _ extends React.Component {
	row1() {
		return [
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

	row1Stats(position, cs, kills, deaths, assists, vs, ddtc, ge) {
		return {
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
							label: "Player",
						},
					].concat(this.fillRow(this.row1()))}
					rows={[
						this.statLineObj(
							{
								name: "Major1224",
							},
							this.row1Stats("Top", 300, 10, 10, 10, 56, 101000, 15000),
							<Tables.Stats STATE={this.props.STATE} />
						),
						this.statLineObj(
							{
								name: "Phortwenty",
							},
							this.row1Stats("Jungle", 300, 10, 10, 10, 56, 101000, 15000),
							<Tables.Stats STATE={this.props.STATE} />
						),
						this.statLineObj(
							{
								name: "Jetgorilla",
							},
							this.row1Stats("Middle", 300, 10, 10, 10, 56, 101000, 15000),
							<Tables.Stats STATE={this.props.STATE} />
						),
						this.statLineObj(
							{
								name: "Khyroe",
							},
							this.row1Stats("Bottom", 300, 10, 10, 10, 56, 101000, 15000),
							<Tables.Stats STATE={this.props.STATE} />
						),
						this.statLineObj(
							{
								name: "Braer",
							},
							this.row1Stats("Support", 300, 10, 10, 10, 56, 101000, 15000),
							<Tables.Stats STATE={this.props.STATE} />
						),
					]}
				/>
			</Style.Table>
		);
	}
}
