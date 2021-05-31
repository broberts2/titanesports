import React from "react";
import Fab from "@material-ui/core/Fab";
import Style from "./style";

export default (props) => {
	const classes = Style();
	return (
		<Fab
			color="primary"
			aria-label="add"
			onClick={() => (props.onClick ? props.onClick() : null)}
		>
			{props.children}
		</Fab>
	);
};
