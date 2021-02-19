import React from "react";
import Style from "./style";
import Components from "../components";
import {
	Img,
	Text,
	HoverCard,
	Transition,
	Theme,
	TextField,
} from "arclight-react";

export default class _ extends React.Component {
	async getUsers() {
		const users = await Promise.all(
			this.state.users
				.slice(this.state.index, this.state.index + this.state.dNum)
				.map(
					async (id) =>
						await this.props.STATE.GLOBAL_METHODS.doAction(
							null,
							"get",
							`/Oracle/getUser?id=${id}`
						)
				)
		);
		console.log(users);
	}

	async componentDidMount() {
		const users = await this.props.STATE.GLOBAL_METHODS.doAction(
			null,
			"get",
			`/Oracle/getAllUsers`
		).then((arr) => arr.map((u) => u.userID));
		this.setState({ users, index: 0, dNum: 15 }, () => this.getUsers());
	}

	panel(data, i) {
		return (
			<Transition trans={{ animation: "fadeInLeft", delay: i * 0.2 }}>
				<Style.Panel>
					<Style.PanelContent
						backgroundColor={
							Theme[Theme[this.props.STATE.THEME].complement].backgroundColor
						}
					>
						<Style.PanelContentTitle>
							<Text theme={Theme[this.props.STATE.THEME].complement}>
								{data.nickname ? data.nickname : data.displayName}
							</Text>
						</Style.PanelContentTitle>
					</Style.PanelContent>
				</Style.Panel>
			</Transition>
		);
	}

	renderList(usersList) {
		const rows = [];
		const n = 5;
		let row = [];
		for (let i = 0; i < this.state.dNum; i++) {
			if (i % n === 0 && i > 0) {
				rows.push(<tr>{row}</tr>);
				row = [];
			}
			row.push(
				<td align={"center"} style={{ padding: "15px" }}>
					{this.panel(usersList[i], i)}
				</td>
			);
		}
		if (row.length > 0) {
			for (let i = row.length; i < n; i++) {
				row.push(<td />);
			}
			rows.push(row);
		}
		return (
			<table>
				<tbody>{rows}</tbody>
			</table>
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
								TES Community
							</Text>
						</Style.PageTitle>
						<Style.Banner>
							<Img
								trans={{
									animation: this.props.STATE.pageFading ? "zoomOut" : "zoomIn",
								}}
								src={
									this.props.STATE.ENDPOINT +
									"/" +
									"static/assets/community.png"
								}
							/>
						</Style.Banner>
						<Style.Blurb>
							<Text theme={this.props.STATE.THEME}>Lorum Ipsum</Text>
						</Style.Blurb>
						<Style.List>
							<Style.ListSearch>
								<TextField
									variant={"outlined"}
									theme={this.props.STATE.THEME}
									textSize={null}
									onEnter={(e) => console.log(e)}
									readonly={false}
									value={null}
									placeholder={"Search"}
									onChange={(e) => console.log(e.target.value)}
								/>
							</Style.ListSearch>
							{this.state.usersList}
						</Style.List>
					</React.Fragment>
				) : null}
			</Style.Base>
		);
	}
}
