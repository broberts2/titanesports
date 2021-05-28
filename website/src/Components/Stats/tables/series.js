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
					title={"Series"}
					headCells={[
						{
							id: "name",
							numeric: false,
							disablePadding: true,
							label: "Game Number",
						},
					]}
					rows={[
						{
							name: "Game 1",
							__collapse__: (
								<Tables.Players
									STATE={this.props.STATE}
									DATA={this.props.DATA}
								/>
							),
						},
						{
							name: "Game 2",
							__collapse__: (
								<Tables.Players
									STATE={this.props.STATE}
									DATA={this.props.DATA}
								/>
							),
						},
						{
							name: "Game 3",
							__collapse__: (
								<Tables.Players
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
