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
					title={"Season 5 - Divinity"}
					headCells={[
						{
							id: "name",
							numeric: false,
							disablePadding: true,
							label: "Week Number",
						},
					]}
					rows={[
						{
							name: "Week 1",
							__collapse__: (
								<Tables.Teams STATE={this.props.STATE} DATA={this.props.DATA} />
							),
						},
						{
							name: "Week 2",
							__collapse__: (
								<Tables.Teams STATE={this.props.STATE} DATA={this.props.DATA} />
							),
						},
						{
							name: "Week 1",
							__collapse__: (
								<Tables.Teams STATE={this.props.STATE} DATA={this.props.DATA} />
							),
						},
					]}
				/>
			</Style.Table>
		);
	}
}
