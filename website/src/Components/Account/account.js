import React from "react";
import Style from "./style";
import { Img, Theme, Transition, Text, Button } from "arclight-react";

export default class _ extends React.Component {
	spawnBadges(badges) {
		let row = [];
		let rows = [];
		let n = 7;
		badges.map((el, i) => {
			if (i % n === 0 && i > 0) {
				rows.push(<tr>{row}</tr>);
				row = [];
			}
			row.push(
				<td align={"center"} style={{ padding: "1vw" }}>
					{el}
				</td>
			);
		});
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

	badgesSection(header) {
		return (
			<React.Fragment>
				<Style.SubSectionHeader>
					<Text theme={this.props.STATE.THEME}>{header}</Text>
				</Style.SubSectionHeader>
				{this.state.badges ? (
					<Style.Badges>{this.spawnBadges(this.state.badges)}</Style.Badges>
				) : null}
			</React.Fragment>
		);
	}

	getParams() {
		const params = {};
		window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => {
			params[key] = value;
		});
		return params;
	}

	async setup() {
		this.state = null;
		const params = this.getParams();
		const user = await this.props.STATE.GLOBAL_METHODS.getUser(params.user);
		const badges = await this.props.STATE.GLOBAL_METHODS.getBadgeBatch(
			"7vw",
			user.badges
		);
		const names = user.nickname.split("|");
		this.setState({
			user: params.user,
			isMe: this.props.STATE.MY_ID === params.user,
			editing: false,
			badges: badges.map((el) => el.component),
			avatarUrl: user.avatarUrl,
			nickname: names[0].trim(),
			subname: names[1] ? names[1].trim() : null,
			profileBanner: user.profileBanner,
			profileIcon: user.profileIcon,
			opGG: user.opGG,
		});
	}

	componentDidMount() {
		this.setup();
	}

	noBadges() {
		return (
			<Style.NoBadges>
				Looks like you don't have any badges yet. Participate in TES events and
				tournaments to earn more!
			</Style.NoBadges>
		);
	}

	render() {
		if (this.state && this.state.user !== this.getParams().user) this.setup();
		return (
			<Style.Base
				backgroundColor={Theme[this.props.STATE.THEME].backgroundColor}
			>
				{this.state ? (
					<React.Fragment>
						<Style.Banner
							lineColor={
								Theme[Theme[this.props.STATE.THEME].complement].backgroundColor
							}
						>
							<Style.BannerBGImg>
								<Img
									trans={{
										animation: this.props.STATE.pageFading
											? "fadeOut"
											: "fadeIn",
									}}
									src={
										this.state.profileBanner
											? this.state.profileBanner
											: this.props.STATE.ENDPOINT +
											  "/" +
											  "static/profile_banners/default.png"
									}
								/>
							</Style.BannerBGImg>
							{this.state.isMe ? (
								<Style.ModifyButtons>
									<Button
										theme={Theme[this.props.STATE.THEME].complement}
										pop
										onClick={() =>
											this.setState({ editing: !this.state.editing })
										}
									>
										<div style={{ width: "200px" }}>Edit</div>
									</Button>
									<Button
										theme={Theme[this.props.STATE.THEME].complement}
										pop
										onClick={() => this.props.STATE.GLOBAL_METHODS.signOut()}
									>
										<div style={{ width: "200px" }}>Sign Out</div>
									</Button>
								</Style.ModifyButtons>
							) : null}
							{this.state.editing ? (
								<Style.ModifyBanner>
									<Button
										theme={Theme[this.props.STATE.THEME].complement}
										pop
										onClick={() => {
											this.props.STATE.GLOBAL_METHODS.setFilePickerDir({
												dir: "profile_banners",
												cb: async (file) => {
													const res = await this.props.STATE.GLOBAL_METHODS.doAction(
														{
															profileBanner: file,
															id: this.state.user,
															myId: this.props.STATE.MY_ID,
														},
														"put",
														"/Account/updateSelf"
													);
													window.location.reload();
												},
											});
											this.props.STATE.GLOBAL_METHODS.showModal("ImagePicker");
										}}
									>
										<div style={{ width: "300px" }}>Change Banner</div>
									</Button>
								</Style.ModifyBanner>
							) : null}
							<Transition
								trans={{
									animation: this.props.STATE.pageFading
										? "fadeOutLeft"
										: "fadeInLeft",
								}}
							>
								<div style={{ position: "absolute" }}>
									<Style.BannerProfileImg
										lineColor={
											Theme[Theme[this.props.STATE.THEME].complement]
												.backgroundColor
										}
									>
										<Img src={this.state.avatarUrl} />
									</Style.BannerProfileImg>
									{this.state.opGG ? (
										<Style.Verified>
											<Text theme={this.props.STATE.THEME}>Verified</Text>
											<a href={this.state.opGG} target={"_blank"}>
												Player Lookup
											</a>
										</Style.Verified>
									) : null}
								</div>
							</Transition>
						</Style.Banner>
						<Style.Title>
							<Style.TitlePrimary>
								<Text
									trans={{
										animation: this.props.STATE.pageFading
											? "fadeOutRight"
											: "fadeInRight",
									}}
									theme={this.props.STATE.THEME}
								>
									{this.state.nickname}
								</Text>
							</Style.TitlePrimary>
							<Style.TitleSecondary>
								<Text
									trans={{
										animation: this.props.STATE.pageFading
											? "fadeOutRight"
											: "fadeInRight",
										delay: 0.2,
									}}
									theme={this.props.STATE.THEME}
								>
									{this.state.subname}
								</Text>
							</Style.TitleSecondary>
						</Style.Title>
						<Style.ProfileCrown>
							<Img
								trans={{
									animation: this.props.STATE.pageFading ? "zoomOut" : "zoomIn",
								}}
								src={
									this.state.profileIcon
										? this.state.profileIcon
										: this.props.STATE.ENDPOINT +
										  "/" +
										  "static/profile_imgs/default.png"
								}
							/>
							{this.state.editing ? (
								<Style.ModifyCrown>
									<Button
										theme={Theme[this.props.STATE.THEME].complement}
										pop
										onClick={() => {
											this.props.STATE.GLOBAL_METHODS.setFilePickerDir({
												dir: "profile_imgs",
												cb: async (file) => {
													const res = await this.props.STATE.GLOBAL_METHODS.doAction(
														{
															profileIcon: file,
															id: this.state.user,
															myId: this.props.STATE.MY_ID,
														},
														"put",
														"/Account/updateSelf"
													);
													window.location.reload();
												},
											});
											this.props.STATE.GLOBAL_METHODS.showModal("ImagePicker");
										}}
									>
										<div style={{ width: "300px" }}>Change Crown</div>
									</Button>
								</Style.ModifyCrown>
							) : null}
						</Style.ProfileCrown>
						<Style.PageContent>
							<Style.SectionHeader>
								<Text theme={this.props.STATE.THEME}>Profile Badges</Text>
							</Style.SectionHeader>
							{this.state.badges && this.state.badges.length > 0
								? this.badgesSection("Season 6 - Divinity")
								: this.noBadges()}
						</Style.PageContent>
					</React.Fragment>
				) : null}
			</Style.Base>
		);
	}
}
