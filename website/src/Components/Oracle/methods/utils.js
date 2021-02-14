import React from "react";
import Style from "./style";
import { Button, Theme, TextField, Img, TextArea } from "arclight-react";

class ScrollItems extends React.Component {
	state = {};

	render() {
		return (
			<Style.Component>
				<Style.ItemTitle>{this.props.title}</Style.ItemTitle>
				<Style.ScrollItemsWrapper>
					<Style.ScrollItems>
						{this.props.items.map((obj) => (
							<Style.ScrollItemsItem
								isSelected={obj.id === this.state.selectedId}
								onClick={() => {
									this.setState({ selectedId: obj.id });
									this.props.onSelect(obj.id);
								}}
							>
								{obj.name}
							</Style.ScrollItemsItem>
						))}
					</Style.ScrollItems>
				</Style.ScrollItemsWrapper>
			</Style.Component>
		);
	}
}

class ScrollList extends React.Component {
	render() {
		return (
			<Style.Component>
				<Style.ItemTitle>{this.props.title}</Style.ItemTitle>
				<Style.ScrollItemsWrapper>
					<Style.ScrollItems flex>
						{this.props.items.map((item, i) => (
							<Style.ScrollItemsItem
								id={`scroll_item_${i}`}
								onClick={() => null}
							>
								{item.text}
							</Style.ScrollItemsItem>
						))}
					</Style.ScrollItems>
				</Style.ScrollItemsWrapper>
			</Style.Component>
		);
	}
}

class Intro extends React.Component {
	render() {
		return (
			<Style.Component>
				<Style.Title>{this.props.title}</Style.Title>
				<Style.Description>{this.props.description}</Style.Description>
			</Style.Component>
		);
	}
}

class Execute extends React.Component {
	render() {
		return (
			<Style.Component>
				<Style.Execute isValid={this.props.isValid}>
					<Button
						trans={{ animation: "fadeInDown", delay: 0.25 }}
						theme={Theme[this.props.STATE.THEME].complement}
						pop
						onClick={async () => this.props.cb()}
					>
						Run Command!
					</Button>
				</Style.Execute>
			</Style.Component>
		);
	}
}

class UrlImage extends React.Component {
	render() {
		return (
			<Style.Component>
				<TextField
					variant={"outlined"}
					theme={this.props.STATE.THEME}
					value={this.props.value}
					placeholder={"Enter an Image Url"}
					onChange={(e) => this.props.onChange(e.target.value)}
				/>
				{this.props.imgSrc ? (
					<Style.UrlImageImage>
						<Img src={this.props.imgSrc} />
					</Style.UrlImageImage>
				) : null}
			</Style.Component>
		);
	}
}

class TimeInput extends React.Component {
	state = {
		value: "",
	};

	parse(value) {
		const al = () =>
			alert(
				"Format is invalid. You must specify an integer, followed by a single character of 's', 'm', 'h', or 'd'."
			);
		const ala = () => alert("Format is valid!");
		if (value && value.length > 0) {
			const context = value.slice(-1);
			let time = value.slice(0, value.length - 1);
			if (
				Number.isInteger(parseInt(time)) &&
				context.length === 1 &&
				isNaN(context)
			) {
				time = parseInt(time);
				switch (context) {
					case "s":
						ala();
						return time * 1000;
					case "m":
						ala();
						return time * 60000;
					case "h":
						ala();
						return time * 60000 * 60;
					case "d":
						ala();
						return time * 60000 * 60 * 24;
					default:
						al();
						return null;
				}
			}
		}
		al();
		return null;
	}

	render() {
		return (
			<Style.Component>
				<TextField
					variant={"outlined"}
					theme={this.props.STATE.THEME}
					value={this.state.value}
					placeholder={
						"Duration (Example - 60s, 60m, 60h, 60d) | Press Enter to Verify"
					}
					onChange={(e) => this.setState({ value: e.target.value })}
					onEnter={() => this.props.onEnter(this.parse(this.state.value))}
				/>
			</Style.Component>
		);
	}
}

class Question extends React.Component {
	render() {
		return (
			<Style.Component>
				<TextField
					variant={"outlined"}
					theme={this.props.STATE.THEME}
					value={this.props.value}
					placeholder={"Pose a Question"}
					onChange={(e) => this.props.onChange(e.target.value)}
				/>
			</Style.Component>
		);
	}
}

class ProvideAnAnswer extends React.Component {
	render() {
		return (
			<Style.Component>
				<TextArea
					value={this.props.value}
					height={"25px"}
					theme={this.props.STATE.THEME}
					controls={
						this.props.isLast
							? [
									{
										name: "Remove",
										operation: () =>
											this.props.answerArray.length > 1
												? this.props.setAnswerArray(
														this.props.answerArray.slice(0, -1)
												  )
												: null,
									},
									{
										name: "Add",
										operation: () =>
											this.props.setAnswerArray(
												this.props.answerArray.concat("")
											),
									},
							  ]
							: []
					}
					placeholder={"Specify a response!"}
					onChange={(e) => this.props.onChange(e.target.value)}
				/>
			</Style.Component>
		);
	}
}

export default {
	ScrollItems,
	Intro,
	Execute,
	UrlImage,
	Question,
	ProvideAnAnswer,
	TimeInput,
	ScrollList,
};
