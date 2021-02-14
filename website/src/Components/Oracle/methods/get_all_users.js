import React from "react";
import Style from "./style";
import Utils from "./utils";

export default class _ extends React.Component {
	async componentDidMount() {
		const members = await this.props.STATE.GLOBAL_METHODS.doAction(
			null,
			"get",
			"/Oracle/getAllUsers"
		).then((el) =>
			el
				.sort((a, b) => (a.displayName > b.displayName ? 1 : -1))
				.map((item, i) => ({
					index: i,
					text: `${item.displayName} - ${item.userID}`,
					cb: () => document.execCommand("copy"),
				}))
		);
		this.setState({ members });
	}

	render() {
		return this.state ? (
			<Style.Base>
				<Utils.Intro
					STATE={this.props.STATE}
					title={"TES Guild Members"}
					description={"This shows all members of the TES guild!"}
				/>
				<Utils.ScrollList
					STATE={this.props.STATE}
					title={"TES Guild Members"}
					items={this.state.members}
				/>
			</Style.Base>
		) : null;
	}
}
