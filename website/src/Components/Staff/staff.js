import React from "react";
import Style from "./style";
import Components from "../components";
import { Img, Text, HoverCard, Transition, Theme } from "arclight-react";

export default class _ extends React.Component {
	hoverCard(title, sTitle, mTitle, img) {
		return (
			<HoverCard
				onClick={(boolean) => console.log("click event!")}
				onHover={() => console.log("hovered")}
				onExit={() => console.log("exited")}
				theme={this.props.STATE.THEME}
				size={{ width: "100%", height: "30vw" }}
				front={
					<Style.HoverCard
						backgroundColor={
							Theme[Theme[this.props.STATE.THEME].complement].backgroundColor
						}
					>
						<img src={this.props.STATE.ENDPOINT + "/" + img} />
						<Style.HoverCardTitle>
							<Text theme={Theme[this.props.STATE.THEME].complement}>
								{title}
							</Text>
						</Style.HoverCardTitle>
						<Style.HoverCardSubTitle>
							<Text theme={Theme[this.props.STATE.THEME].complement}>
								{sTitle}
							</Text>
						</Style.HoverCardSubTitle>
						<Style.HoverCardMTitle>
							<Text theme={Theme[this.props.STATE.THEME].complement}>
								{mTitle}
							</Text>
						</Style.HoverCardMTitle>
					</Style.HoverCard>
				}
				back={
					<Style.HoverCard
						backgroundColor={
							Theme[Theme[this.props.STATE.THEME].complement].backgroundColor
						}
					></Style.HoverCard>
				}
			/>
		);
	}

	panel(panelTitle, blurb, members) {
		const _ = (arr) => {
			const nPerRow = 3;
			const trs = [];
			let tr = [];
			while (arr.length < nPerRow) {
				arr.push(<div />);
			}
			for (let i = 0; i < arr.length; i++) {
				if (i % nPerRow == 0 && i > 0) {
					trs.push(<tr>{tr}</tr>);
					tr = [];
				}
				tr.push(
					<td align={"center"} style={{ padding: "2vw" }}>
						<div style={{ width: "100%" }}>{arr[i]}</div>
					</td>
				);
			}
			if (tr.length > 0) {
				trs.push(tr);
			}
			return trs;
		};
		return (
			<Style.Panel>
				<Transition
					trans={{
						animation: this.props.STATE.pageFading
							? "fadeOutRight"
							: "fadeInLeft",
					}}
				>
					<Style.PanelTitle>
						<Text
							trans={{
								animation: this.props.STATE.pageFading
									? "fadeOutLeft"
									: "fadeInRight",
							}}
							theme={this.props.STATE.THEME}
						>
							{panelTitle}
						</Text>
					</Style.PanelTitle>
					<Style.PanelBlurb>
						<Text theme={this.props.STATE.THEME}>{blurb}</Text>
					</Style.PanelBlurb>
					<table>
						<tbody>{_(members)}</tbody>
					</table>
				</Transition>
			</Style.Panel>
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
						TES Staff
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
							"static/assets/spirit-blossom-yasuo.png"
						}
					/>
				</Style.Banner>
				{this.panel(
					"Administrators",
					`It is a long established fact that a reader will be distracted by the readable content 
                    of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution 
                    of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop 
                    publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem 
                    ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes 
                    by accident, sometimes on purpose (injected humour and the like).`,
					[
						this.hoverCard(
							"Phortwenty",
							"Administrator",
							"Operations",
							"static/assets/phort.png"
						),
						this.hoverCard(
							"Major",
							"Administrator",
							"Administrations",
							"static/assets/major.png"
						),
					]
				)}
				{this.panel(
					"Directors",
					`It is a long established fact that a reader will be distracted by the readable content 
                    of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution 
                    of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop 
                    publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem 
                    ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes 
                    by accident, sometimes on purpose (injected humour and the like).`,
					[
						this.hoverCard(
							"Jetgorilla",
							"Director",
							"Programming",
							"static/assets/jet.png"
						),
						this.hoverCard(
							"Mute",
							"Director",
							"League Director",
							"static/assets/mute.png"
						),
						this.hoverCard(
							"Sammy2Slap",
							"Director",
							"Ban Appeals",
							"static/assets/sammy.png"
						),
						this.hoverCard(
							"Basically Cancer",
							"Director",
							"League Director",
							"static/assets/yauma.png"
						),
						this.hoverCard("Braer", "Director", "", "static/assets/mute.png"),
						this.hoverCard(
							"ZEROBII",
							"Director",
							"Player Integrity",
							"static/assets/zero.png"
						),
						this.hoverCard(
							"Khyroe",
							"Director",
							"Analytics",
							"static/assets/mute.png"
						),
					]
				)}
				{this.panel(
					"Developers",
					`It is a long established fact that a reader will be distracted by the readable content 
                    of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution 
                    of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop 
                    publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem 
                    ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes 
                    by accident, sometimes on purpose (injected humour and the like).`,
					[
						this.hoverCard(
							"LolGermRat",
							"Developer",
							"IT",
							"static/assets/germ.png"
						),
						this.hoverCard(
							"Poptartism",
							"Developer",
							"Graphic Design",
							"static/assets/poptart.png"
						),
					]
				)}
			</Style.Base>
		);
	}
}
