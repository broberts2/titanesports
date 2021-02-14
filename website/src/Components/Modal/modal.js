import React from "react";
import Style from "./style";
import Components from "../components";
import {
	Modal,
	TextField,
	Button,
	Text,
	Theme,
	Table,
	Img,
	FontAwesomeIcon,
} from "arclight-react";

class SignIn extends React.Component {
	state = {
		u: null,
		p: null,
	};

	field(value, isPass) {
		return (
			<Style.SignInField>
				<TextField
					password={isPass}
					variant={"filled"} // optional: standard, outlined, filled
					theme={this.props.THEME}
					textSize={null} // Default 18
					onEnter={(e) => console.log(e)}
					readonly={false}
					value={null}
					placeholder={isPass ? "Discord Password" : "Discord Username"}
					onChange={(e) =>
						isPass
							? this.setState({ p: e.target.value })
							: this.setState({ u: e.target.value })
					}
				/>
			</Style.SignInField>
		);
	}

	render() {
		return (
			<Style.SignIn ENDPOINT={this.props.STATE.ENDPOINT}>
				<Style.SignInContent>
					<Style.SignInButton active={(this.state.u && this.state.p) || true}>
						<Button
							onClick={() =>
								window.location.replace(this.props.STATE.ORACLEOATH2)
							}
							theme={"Light"}
							pop
						>
							<div style={{ width: "calc(500px - 40px)", fontSize: "18px" }}>
								Sign In Using Discord
							</div>
						</Button>
					</Style.SignInButton>
					<div style={{ padding: "5px" }}>
						<Text theme={"Dark"}>
							Learn more about OATH2{" "}
							<a href={"https://oauth.net/2/"} target={"_blank"}>
								here
							</a>
						</Text>
					</div>
					<div style={{ padding: "5px" }}>
						<Text theme={this.props.THEME}>
							<div>
								<a href={"https://discord.com/"} target={"_blank"}>
									Don't have a Discord account?
								</a>
							</div>
							<div>
								<a href={"https://discord.gg/uZ8Q7ncrV4"} target={"_blank"}>
									Not a member of TES?
								</a>
							</div>
						</Text>
					</div>
				</Style.SignInContent>
			</Style.SignIn>
		);
	}
}

class Badge extends React.Component {
	state = {};

	pickColor(c) {
		switch (c) {
			case "uncommon":
				return "green";
			case "rare":
				return "blue";
			case "epic":
				return "purple";
			case "legendary":
				return "orange";
		}
	}

	async componentDidMount() {
		const badge = await this.props.STATE.GLOBAL_METHODS.getBadge(
			"15vw",
			this.props.STATE.viewingBadgeId
		);
		this.setState({ badge });
	}

	render() {
		return this.state.badge ? (
			<Style.BaseBadge>
				<Style.BadgeTitle>
					<Text theme={this.props.STATE.THEME}>
						{this.state.badge.data.name}
					</Text>
				</Style.BadgeTitle>
				{this.state.badge.data.rarity !== "common" ? (
					<Style.BadgeRarity
						color={this.pickColor(this.state.badge.data.rarity)}
					>
						{this.state.badge.data.rarity.toUpperCase()}
					</Style.BadgeRarity>
				) : null}
				<Style.Badge>{this.state.badge.component}</Style.Badge>
				<Style.Description>
					<Text theme={this.props.STATE.THEME}>
						{this.state.badge.data.description}
					</Text>
				</Style.Description>
			</Style.BaseBadge>
		) : null;
	}
}

class Oracle extends React.Component {
	render() {
		switch (this.props.STATE.oracleMethod) {
			case "Flash Poll":
				return <Components.OracleMethods.FlashPoll STATE={this.props.STATE} />;
			case "Get All Users":
				return (
					<Components.OracleMethods.GetAllUsers STATE={this.props.STATE} />
				);
		}
	}
}

class FilePicker extends React.Component {
	state = {
		controls: {},
		files: null,
	};

	async queryStaticAssets() {
		const files = await this.props.STATE.GLOBAL_METHODS.doAction(
			null,
			"get",
			"/WebsiteConfiguration/queryStaticFiles"
		);
		this.setState({ files });
	}

	buildTable(node, __key__) {
		const rows = [];
		for (let key in node) {
			if (typeof node[key] === "object" && node[key] !== null) {
				rows.push({
					name: key,
					img: "",
					__collapse__: this.buildTable(node[key], `${__key__}/${key}`),
				});
			} else {
				rows.push({
					name: node[key],
					img: (
						<Style.TablePreview>
							<Img
								src={`${this.props.STATE.ENDPOINT}/${__key__}/${node[key]}`}
							/>
						</Style.TablePreview>
					),
				});
			}
		}
		return (
			<div style={{ marginBottom: "20px", position: "relative" }}>
				<Table
					animation={"zoomIn"}
					theme={Theme[this.props.STATE.THEME].complement}
					title={__key__}
					headCells={[
						{
							id: "name",
							numeric: false,
							disablePadding: true,
							label: "Files",
						},
						{ id: "name", numeric: false, disablePadding: true, label: "" },
					]}
					rows={rows}
				/>
				<Style.TableControls>
					<Button
						theme={this.props.STATE.THEME}
						pop
						onClick={() => this.props.STATE.GLOBAL_METHODS.setURL("/account")}
					>
						<FontAwesomeIcon
							color={null}
							theme={Theme[this.props.STATE.THEME].complement}
							icon={"plus"}
						/>
					</Button>
				</Style.TableControls>
			</div>
		);
	}

	componentDidMount() {
		this.queryStaticAssets();
	}

	render() {
		return (
			<Style.FilePickerBase>
				<Style.Table>
					{this.state.files
						? this.buildTable(this.state.files, "static")
						: null}
				</Style.Table>
			</Style.FilePickerBase>
		);
	}
}

class ImagePicker extends React.Component {
	async componentDidMount() {
		const files = await this.props.STATE.GLOBAL_METHODS.doAction(
			null,
			"get",
			"/WebsiteConfiguration/queryStaticFiles"
		).then((dir) => dir[this.props.STATE.filePickerDir.dir]);
		this.setState({ files, hoverIndex: -1 });
	}

	setImg(hoverIndex, file) {
		return (
			<td
				onMouseEnter={(i) => this.setState({ hoverIndex })}
				onMouseLeave={() => this.setState({ hoverIndex: -1 })}
				onClick={() => {
					if (window.confirm(`Are you sure you want to select "${file}"?`)) {
						this.props.STATE.GLOBAL_METHODS.showModal();
						this.props.STATE.filePickerDir.cb(
							`${this.props.STATE.ENDPOINT}/static/${this.props.STATE.filePickerDir.dir}/${file}`
						);
					}
				}}
				style={{
					padding: "10px",
					opacity:
						this.state.hoverIndex < 0 || this.state.hoverIndex === hoverIndex
							? 1
							: 0.5,
				}}
			>
				<Img
					src={`${this.props.STATE.ENDPOINT}/static/${this.props.STATE.filePickerDir.dir}/${file}`}
				/>
			</td>
		);
	}

	createTable(arr) {
		const n = 5;
		const rows = [];
		let row = [];
		for (let i = 0; i < arr.length; i++) {
			if (i % n === 0 && i > 0) {
				rows.push(<tr>{row}</tr>);
				row = [];
			}
			row.push(this.setImg(i, arr[i]));
		}
		if (row.length > 0) {
			for (let i = row.length; i < n; i++) {
				row.push(<td />);
			}
			rows.push(<tr>{row}</tr>);
		}
		return rows;
	}

	render() {
		return (
			<Style.ImagePicker>
				{this.state && this.state.files ? (
					<Style.ImagePickerList>
						<table>
							<tbody>{this.createTable(Object.values(this.state.files))}</tbody>
						</table>
					</Style.ImagePickerList>
				) : null}
			</Style.ImagePicker>
		);
	}
}

export default class _ extends React.Component {
	selectModal(modal) {
		switch (modal) {
			case "SignIn":
				return (
					<SignIn
						THEME={this.props.STATE.THEME}
						STATE={this.props.STATE}
						THEME_COMPLEMENT={this.props.STATE.THEME_COMPLEMENT}
					/>
				);
			case "Badge":
				return <Badge STATE={this.props.STATE} />;
			case "FilePicker":
				return <FilePicker STATE={this.props.STATE} />;
			case "Oracle":
				return <Oracle STATE={this.props.STATE} />;
			case "ImagePicker":
				return <ImagePicker STATE={this.props.STATE} />;
		}
	}

	render() {
		return (
			<Modal
				theme={this.props.STATE.THEME}
				visible={this.props.STATE.modal}
				disableClickAway
				setVisible={(a) => this.props.STATE.GLOBAL_METHODS.showModal(a)}
				crown={{
					position: "center",
					constrain: false,
					content: (
						<div>
							<img
								src={this.props.STATE.ENDPOINT + "/" + "static/assets/logo.png"}
							/>
						</div>
					),
				}}
			>
				<Style.Base
					backgroundImg={
						false
							? this.props.STATE.ENDPOINT + "/" + "static/assets/zilean_2.jpg"
							: null
					}
				>
					{this.selectModal(this.props.STATE.modal)}
				</Style.Base>
			</Modal>
		);
	}
}
