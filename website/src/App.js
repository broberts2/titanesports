import React from "react";
import Components from "./Components/components";
import Style from "./style";
import config from "./config";
import Router from "./_ROUTER_";
import { Utils } from "arclight-react";

export default class App extends React.Component {
	async aquireAccess(ENDPOINT, _) {
		const createArticles = await _("createArticles");
		const editArticles = await _("editArticles");
		const deleteArticles = await _("deleteArticles");
		const editSite = await _("editSite");
		const editPermissions = await _("editPermissions");
		const editTitanDraft = await _("editTitanDraft");
		const oracleFlashPoll = await _("oracleFlashPoll");
		const oracleGetAllUsers = await _("oracleGetAllUsers");
		return {
			createArticles,
			editArticles,
			deleteArticles,
			editSite,
			editPermissions,
			editTitanDraft,
			oracleFlashPoll,
			oracleGetAllUsers,
		};
	}

	async queryConfiguration() {
		let identity;
		const identify = async () =>
			await fetch(
				`${ENDPOINT}/Oracle/identify?access_token=${Utils.Cookies.read_cookie(
					"auth_token"
				)}`
			).then((res) => res.json());
		const ENDPOINT = config.production
			? config.productionEndpoint
			: config.developementEndpoint;
		const ORACLEOATH2 = config.production
			? config.productionDiscordOATH2
			: config.developmentDiscordOATH2;
		if (!Utils.Cookies.read_cookie("auth_token")) {
			const params = {};
			window.location.href.replace(
				/[?&]+([^=&]+)=([^&]*)/gi,
				(m, key, value) => {
					params[key] = value;
				}
			);
			Utils.Cookies.bake_cookie("auth_token", params.auth_token);
			Utils.Cookies.bake_cookie("refresh_token", params.refresh_token);
			window.history.replaceState(null, null, window.location.pathname);
		}
		if (Utils.Cookies.read_cookie("auth_token")) {
			identity = await identify();
		}
		const state = await fetch(
			`${ENDPOINT}/WebsiteConfiguration/get`
		).then((res) => res.json());
		state.ENDPOINT = ENDPOINT;
		state.ORACLEOATH2 = ORACLEOATH2;
		const checkAccess = async (action) =>
			Utils.Cookies.read_cookie("auth_token")
				? await fetch(
						`${ENDPOINT}/Oracle/auth_action?token=${Utils.Cookies.read_cookie(
							"auth_token"
						)}&action=${action}`
				  ).then((res) => res.json())
				: false;
		const ACCESS = await this.aquireAccess(ENDPOINT, checkAccess);
		const doAction = async (data, method, route) =>
			await fetch(ENDPOINT + route, {
				headers: {
					"Content-Type": "application/json",
					token: Utils.Cookies.read_cookie("auth_token"),
				},
				method,
				body: data ? JSON.stringify(data) : null,
			}).then((res) => res.json());
		this.setState(
			Object.assign(state, {
				filePickerDir: null,
				oracleMethod: null,
				pageFading: false,
				modal: null,
				url: window.location.pathname,
				DISPLAY_NAME: identity ? identity.username : null,
				NICKNAME: identity
					? identity.nickname.includes("|")
						? identity.nickname.split("|")[0].trim()
						: identity.nickname
					: null,
				SUB_NAME:
					identity && identity.nickname.includes("|")
						? identity.nickname.split("|")[1].trim()
						: null,
				ACCESS,
				MY_ID: identity ? identity.id : null,
				GLOBAL_METHODS: {
					setURL: (url) => {
						this.setState({ pageFading: true });
						setTimeout(() => {
							window.history.replaceState(null, null, url);
							this.setState({ url, pageFading: false });
							window.scrollTo({ top: 0, behavior: "smooth" });
						}, 1000);
					},
					setFilePickerDir: (filePickerDir) => this.setState({ filePickerDir }),
					getUser: async (id) => {
						const user = await fetch(
							`${ENDPOINT}/Oracle/getUser?id=${id}`
						).then((res) => res.json());
						return user;
					},
					signOut: () => {
						Utils.Cookies.delete_cookie("auth_token");
						window.location.href = "/";
					},
					setViewingBadgeId: (viewingBadgeId) =>
						this.setState({ viewingBadgeId }),
					setOracleMethod: (oracleMethod) => this.setState({ oracleMethod }),
					showModal: (modal) => this.setState({ modal }),
					checkAccess,
					doAction,
					identify,
					getBadge: async (size, id) => {
						const data = await fetch(
							`${ENDPOINT}/Badge/getBadgeById?id=${id}`
						).then((res) => res.json());
						return {
							component: (
								<Components.Badge
									STATE={this.state}
									cfg={Object.assign(data, { size })}
								/>
							),
							data,
						};
					},
					getArticleById: async (id) =>
						await fetch(
							`${ENDPOINT}/Article/getArticles?id=${id}`
						).then((res) => res.json()),
					getArticles: async () =>
						await fetch(`${ENDPOINT}/Article/getArticles`).then((res) =>
							res.json()
						),
					createArticle: async (data) =>
						await fetch(`${ENDPOINT}/Article/createArticle`, {
							headers: {
								"Content-Type": "application/json",
								token: Utils.Cookies.read_cookie("auth_token"),
							},
							method: "post",
							body: JSON.stringify({ ...data }),
						}).then((res) => res.json()),
					updateArticle: async (data) =>
						await fetch(`${ENDPOINT}/Article/updateArticle`, {
							headers: {
								"Content-Type": "application/json",
								token: Utils.Cookies.read_cookie("auth_token"),
							},
							method: "put",
							body: JSON.stringify({ ...data }),
						}).then((res) => res.json()),
					publishArticle: async (data) =>
						await fetch(`${ENDPOINT}/Article/publishArticle`, {
							headers: {
								"Content-Type": "application/json",
								token: Utils.Cookies.read_cookie("auth_token"),
							},
							method: "put",
							body: JSON.stringify({ ...data }),
						}).then((res) => res.json()),
					deleteArticle: async (data) =>
						await fetch(`${ENDPOINT}/Article/deleteArticle`, {
							headers: {
								"Content-Type": "application/json",
								token: Utils.Cookies.read_cookie("auth_token"),
							},
							method: "delete",
							body: JSON.stringify({ ...data }),
						}).then((res) => res.json()),
					getBadgeBatch: async (size, ids) => {
						const badgeArray = await fetch(
							`${ENDPOINT}/Badge/getBadgeBatchById`,
							{
								headers: {
									"Content-Type": "application/json",
									token: Utils.Cookies.read_cookie("auth_token"),
								},
								method: "post",
								body: JSON.stringify({ ids }),
							}
						).then((res) => res.json());
						return badgeArray.map((badge) => ({
							component: (
								<Components.Badge
									STATE={this.state}
									cfg={Object.assign(badge, { size })}
								/>
							),
							badge,
						}));
					},
				},
			})
		);
	}

	componentDidMount() {
		this.queryConfiguration();
	}

	render() {
		return (
			<Style.Base STATE={this.state}>
				{this.state ? (
					<React.Fragment>
						<Components.Modal STATE={this.state} />
						{Router(this.state)}
						<Components.Header STATE={this.state} />
						<Components.Footer STATE={this.state} />
					</React.Fragment>
				) : (
					<div style={{ height: "100vh" }} />
				)}
			</Style.Base>
		);
	}
}
