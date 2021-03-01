import React from "react";
import Style from "./style";
import Components from "../components";
import { Img, Text, Theme, Table, Dropdown, Button } from "arclight-react";
import Panels from "./panels/index.js";

export default class _ extends React.Component {
	state = {
		activeTable: this.table("Website"),
		fading: false,
	};

	table(title) {
		const getRows = () => {
			const arr = [];
			for (let key in Panels[title]) {
				const __Panel__ = Panels[title][key];
				arr.push({
					name: key,
					__collapse__: <__Panel__ STATE={this.props.STATE} />,
				});
			}
			return arr;
		};
		return (
			<Style.Table>
				<Table
					trans={{
						animation: this.state && this.state.fading ? "zoomIn" : "zoomIn",
					}}
					animation={"zoomIn"}
					theme={Theme[this.props.STATE.THEME].complement}
					title={title}
					headCells={[
						{
							id: "name",
							numeric: false,
							disablePadding: true,
							label: "Components",
						},
					]}
					rows={getRows()}
				/>
			</Style.Table>
		);
	}

	swapTable(title) {
		this.setState({ fading: true });
		setTimeout(
			() =>
				this.setState({
					activeTable: this.table(title),
					fading: false,
				}),
			1000
		);
	}

	render() {
		return (
			<Style.Base>
				<Style.PageTitle>
					<Text
						trans={{
							animation: this.props.STATE.pageFading
								? "fadeOutLeft"
								: "fadeInLeft",
						}}
						theme={this.props.STATE.THEME}
					>
						Settings
					</Text>
				</Style.PageTitle>
				<Style.Banner>
					<Img
						trans={{
							animation: this.props.STATE.pageFading ? "zoomOut" : "zoomIn",
						}}
						src={
							this.props.STATE.ENDPOINT + "/" + "static/assets/heimerdinger.png"
						}
					/>
				</Style.Banner>
				<Style.DropDown>
					<Style.DropDownTitle>
						<Text theme={this.props.STATE.THEME}>Select a Gadget</Text>
					</Style.DropDownTitle>
					<Dropdown
						defaultValue={"Website"}
						theme={Theme[this.props.STATE.THEME].complement}
						onChange={(e) => this.swapTable(e.target.value)}
						items={[
							{ component: <div>Website</div>, value: "Website" },
							{ component: <div>Titan Draft</div>, value: "Titan Draft" },
							{ component: <div>Discord</div>, value: "Discord" },
						]}
					/>
				</Style.DropDown>
				<div
					onClick={() =>
						this.props.STATE.GLOBAL_METHODS.showModal("FilePicker")
					}
				>
					test
				</div>
				{this.state.activeTable}
			</Style.Base>
		);
	}
}
