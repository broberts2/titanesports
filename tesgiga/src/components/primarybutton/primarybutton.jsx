import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Transitions from "../transitions/transitions";
import Components from "../components";
import Style from "./style";

export default (props) => {
	const classes = Style(props)();
	const bttn = (
		<Button
			className={classes.root}
			onClick={() => (props.onClick ? props.onClick() : null)}
			disabled={props.disabled ? props.disabled : false}
			variant="contained"
			color="primary"
		>
			<Typography>{props.children}</Typography>
		</Button>
	);
	return (
		<Transitions anim={props.anim} delay={props.delay}>
			{props.tooltip ? (
				<Components.Tooltip tooltip={props.tooltip}>{bttn}</Components.Tooltip>
			) : (
				bttn
			)}
		</Transitions>
	);
};
