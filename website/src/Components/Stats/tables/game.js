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
					title={"Game Statistics"}
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
							name: this.props.DATA.teams.blue.name,
							__collapse__: <Tables.Team STATE={this.props.STATE} />,
						},
						{
							name: this.props.DATA.teams.red.name,
							__collapse__: <Tables.Team STATE={this.props.STATE} />,
						},
					]}
				/>
			</Style.Table>
		);
	}
}
