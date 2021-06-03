import { Box, CircularProgress } from "@material-ui/core";
import React from "react";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import Components from "../components";
import _GlobalActions from "../../globalactions/index";
import Style from "./style";

const GlobalActions = _GlobalActions("admin");

const _childMerge = (el) => {
	if (typeof el === "object") {
		switch (el.type) {
			case "a":
				return `<a href=${el.props.href} ${
					el.props.target ? `target="_blank"` : ""
				}>${el.props.children}</a>`;
			case "br":
				return `<br>`;
		}
	} else {
		return el;
	}
};

const Document = (props) => {
	const classes = Style();
	const [snack, setSnack] = React.useState({
		message: "",
		severity: "",
		open: false,
	});
	const [sending, setSending] = React.useState(false);
	const buildState = () => {
		const state = { __img__: props.img };
		props.children.map((el, i) =>
			el.props.isInput
				? (state[el.props.children ? el.props.children : el.props.title] = {
						isInput: true,
						value: null,
						order: i,
						required: el.props.required,
				  })
				: el.props.children
				? (state[el.props.title] = {
						order: i,
						isBlurb: true,
						value: Array.isArray(el.props.children)
							? el.props.children.map((el) => _childMerge(el)).join("")
							: el.props.children,
				  })
				: null
		);
		return state;
	};
	const [state, setState] = React.useState(buildState());
	return (
		<div className={classes.root}>
			<div
				className={classes.body}
				style={{
					opacity: !sending ? 1 : 0.3,
					pointerEvents: sending || snack.severity === "success" ? "none" : "",
				}}
			>
				<Components.Ruby src={props.img} />
				<Box display="flex" width={"100%"} height={"100%"}>
					<Box m="auto">
						{props.children.map((el) =>
							React.cloneElement(el, {
								data: props.data,
								category: props.category,
								setSnack,
								setSending,
								state,
								setState: (m) =>
									setState((lastState) => ({
										...lastState,
										[Object.keys(m)]: Object.values(m)[0],
									})),
							})
						)}
					</Box>
				</Box>
			</div>
			<Components.Snack
				severity={snack.severity}
				close={() => {
					setSnack({ ...snack, open: false });
					if (snack.severity === "success") window.location.reload();
				}}
				open={snack.open}
			>
				{snack.message}
			</Components.Snack>
			<div
				className={classes.miniloader}
				style={{ display: !sending ? "none" : "" }}
			>
				<CircularProgress style={{ color: "purple" }} size={240} />
			</div>
		</div>
	);
};

const Blurb = (props) => {
	const classes = Style();
	return (
		<Components.Blurb title={props.title}>{props.children}</Components.Blurb>
	);
};

const Input = (props) => {
	const classes = Style();
	return (
		<div className={classes.input}>
			<Components.Typography className={classes.typographyh3}>
				{props.children}{" "}
				{props.required ? (
					<span style={{ color: "red", fontSize: 28 }}>
						<b>*</b>
					</span>
				) : null}
			</Components.Typography>
			<Components.TextField
				value={
					props.data && props.data[props.children]
						? props.data[props.children].value
						: null
				}
				label={"Your response"}
				onChange={(e) =>
					props.setState({
						[props.children]: {
							required: props.state[props.children].required,
							value: e,
						},
					})
				}
			/>
		</div>
	);
};

const RadioInput = (props) => {
	const classes = Style();
	return (
		<div className={classes.input}>
			<Components.RadioButton
				value={
					props.data && props.data[props.title]
						? props.data[props.title].value
						: null
				}
				label={
					<div>
						{props.title}
						{props.required ? (
							<span style={{ color: "red", fontSize: 28 }}>
								<b>*</b>
							</span>
						) : null}
					</div>
				}
				items={props.items}
				row={props.row}
				onChange={(e) =>
					props.setState({
						[props.title]: {
							required: props.state[props.title].required,
							value: e,
						},
					})
				}
			/>
		</div>
	);
};

const CheckboxInput = (props) => {
	const classes = Style();
	return (
		<div className={classes.input}>
			<Components.Typography className={classes.typographyh3}>
				{props.title}{" "}
				{props.required ? (
					<span style={{ color: "red", fontSize: 28 }}>
						<b>*</b>
					</span>
				) : null}
			</Components.Typography>
			<Components.CheckBox
				value={
					props.data && props.data[props.title]
						? props.data[props.title].value
						: null
				}
				onChange={(e) =>
					props.setState({
						[props.title]: {
							required: props.state[props.title].required,
							value: e,
						},
					})
				}
				items={props.items}
				row={props.row}
			/>
		</div>
	);
};

const Submit = (props) => {
	const classes = Style();
	const validate = async () => {
		for (let key in props.state) {
			if (!props.state[key].value && props.state[key].required) {
				return {
					open: true,
					message: "Please fill all required form elements",
					severity: "warning",
				};
			}
		}
		disablePageScroll();
		console.log(props.state);
		props.setSending(true);
		return new Promise(async (resolve) => {
			const res = await GlobalActions.Requests.postApplication(
				props.state,
				window.location.hostname.split(".")[0],
				props.category
			);
			resolve(
				res.code === 200
					? {
							open: true,
							message: "Form submission successful",
							severity: "success",
					  }
					: {
							open: true,
							message: "Form submission failed",
							severity: "error",
					  }
			);
		});
	};
	return !props.data ? (
		<div className={classes.input}>
			<Components.PrimaryButton
				fill
				onClick={async () => {
					const res = await validate();
					props.setSending(false);
					enablePageScroll();
					props.setSnack(res);
				}}
			>
				Submit
			</Components.PrimaryButton>
		</div>
	) : null;
};

export default {
	Document,
	Blurb,
	Input,
	RadioInput,
	CheckboxInput,
	Submit,
};
