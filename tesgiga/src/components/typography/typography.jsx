import { Typography } from "@material-ui/core";
import Transitions from "../transitions/transitions";
import React from "react";

export default (props) => {
	return (
		<Transitions anim={props.anim} delay={props.delay}>
			<Typography {...props}>{props.children}</Typography>
		</Transitions>
	);
};
