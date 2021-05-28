import React from "react";
import Style from "./style";
import Components from "../components";
import { Img, Text, Panel, Theme, DiamondDivider } from "arclight-react";

export default class _ extends React.Component {
	item(i, fnt, img) {
		return (
			<Panel
				trans={{ animation: "fadeInLeft", delay: i / 5 }}
				padding={"30px"}
				background={{ type: "img", src: img }}
				onClick={() => {
					this.props.STATE.GLOBAL_METHODS.setOracleMethod(fnt);
					this.props.STATE.GLOBAL_METHODS.showModal("Oracle");
				}}
				width={"100%"}
				height={"20vw"}
				theme={Theme[this.props.STATE.THEME].complement}
			>
				<Text theme={Theme[this.props.STATE.THEME].complement}>{fnt}</Text>
			</Panel>
		);
	}

	itemTable(items) {
		const n = 4;
		let row = [];
		let rows = [];
		for (let i = 0; i < items.length; i++) {
			if (i % n === 0 && n > 0) {
				rows.push(<tr>{row}</tr>);
				row = [];
			}
			row.push(
				<td style={{ padding: "15px" }}>
					{this.item(i, items[i].fnt, items[i].img)}
				</td>
			);
		}
		if (row.length > 0) {
			for (let i = row.length; i < n; i++) {
				row.push(<td />);
			}
			rows.push(<tr>{row}</tr>);
		}
		return (
			<Style.Panels>
				<table>
					<tbody>{rows}</tbody>
				</table>
			</Style.Panels>
		);
	}

	async componentDidMount() {
		const oracleFlashPoll = await this.props.STATE.GLOBAL_METHODS.checkAccess(
			"oracleFlashPoll"
		);
		const oracleGetAllUsers = await this.props.STATE.GLOBAL_METHODS.checkAccess(
			"oracleGetAllUsers"
		);
		const oracleGetAllRoles = await this.props.STATE.GLOBAL_METHODS.checkAccess(
			"oracleGetAllRoles"
		);
		const oracleCreateCodes = await this.props.STATE.GLOBAL_METHODS.checkAccess(
			"oracleCreateCodes"
		);
		this.setState({
			canAccess:
				oracleFlashPoll ||
				oracleGetAllUsers ||
				oracleGetAllRoles ||
				oracleCreateCodes,
			oracleFlashPoll,
			oracleGetAllUsers,
			oracleGetAllRoles,
			oracleCreateCodes,
		});
	}

	render() {
		return (
			<Style.Base>
				{this.state && this.state.canAccess ? (
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
								Oracle
							</Text>
						</Style.PageTitle>
						{false ? (
							<React.Fragment>
								<Style.Banner>
									<Style.BannerImg
										boxColor={
											Theme[Theme[this.props.STATE.THEME].complement]
												.backgroundColor
										}
									>
										<Img
											trans={{
												animation: this.props.STATE.pageFading
													? "zoomOut"
													: "zoomIn",
											}}
											src={
												this.props.STATE.ENDPOINT +
												"/" +
												"static/assets/oracle.gif"
											}
										/>
									</Style.BannerImg>
								</Style.Banner>
								<Style.Divider>
									<DiamondDivider
										filter={
											Theme[Theme[this.props.STATE.THEME].complement]
												.backgroundFilter
										}
									/>
								</Style.Divider>
							</React.Fragment>
						) : null}
						{this.itemTable(
							[
								{
									access: this.state.oracleFlashPoll,
									fnt: "Flash Poll",
									img: `${this.props.STATE.ENDPOINT}/static/assets/oracle.png`,
								},
								{
									access: this.state.oracleGetAllUsers,
									fnt: "Get All Users",
									img: `${this.props.STATE.ENDPOINT}/static/assets/oracle.png`,
								},
								{
									access: this.state.oracleGetAllRoles,
									fnt: "Get All Roles",
									img: `${this.props.STATE.ENDPOINT}/static/assets/oracle.png`,
								},
								{
									access: this.state.oracleCreateCodes,
									fnt: "Create Tournament Codes",
									img: `${this.props.STATE.ENDPOINT}/static/assets/oracle.png`,
								},
							].filter((el) => (el.access ? el : null))
						)}
					</React.Fragment>
				) : this.state ? (
					<Components.NoPoro
						align={"right"}
						trans={{ animation: "fadeInUp" }}
						text={"401 Unauthorized"}
						STATE={this.props.STATE}
					/>
				) : null}
			</Style.Base>
		);
	}
}
