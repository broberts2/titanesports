import React from "react";
import { Grow } from "@material-ui/core";

const TransitionGroup = {
	Grow,
};

export default (props) => {
	switch (props.anim) {
		case "grow":
			return (
				<TransitionGroup.Grow in={true} timeout={props.delay ? props.delay : 0}>
					{props.children}
				</TransitionGroup.Grow>
			);
		default:
			return <div>{props.children}</div>;
	}
};
