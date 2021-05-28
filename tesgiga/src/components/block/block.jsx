import React from "react";
import Components from "../../components/components";
import Style from "./style";

export default (props) => {
	const classes = Style();
	return (
		<Components.Typography className={classes.root}>
			{props.children}
		</Components.Typography>
	);
};
