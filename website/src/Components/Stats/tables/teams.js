import React from "react";
import Style from "../style";
import { Table, Theme } from "arclight-react";
import Tables from "./index";

export default class _ extends React.Component {
	render() {
		return (
			<Style.Table>
				<Table
					search={"75%"}
					animation={"fadeInLeft"}
					theme={Theme[this.props.STATE.THEME].complement}
					title={"Teams"}
					headCells={[
						{
							id: "name",
							numeric: false,
							disablePadding: true,
							label: "Teams",
						},
					]}
					rows={[
						{
							name: "Team 1 vs Team 2",
							__collapse__: (
								<Tables.Series
									STATE={this.props.STATE}
									DATA={this.props.DATA}
								/>
							),
						},
						{
							name: "Team 3 vs Team 4",
							__collapse__: (
								<Tables.Series
									STATE={this.props.STATE}
									DATA={this.props.DATA}
								/>
							),
						},
						{
							name: "Team 5 vs Team 6",
							__collapse__: (
								<Tables.Series
									STATE={this.props.STATE}
									DATA={this.props.DATA}
								/>
							),
						},
					]}
				/>
			</Style.Table>
		);
	}
}
