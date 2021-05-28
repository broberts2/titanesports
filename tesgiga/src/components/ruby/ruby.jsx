import React from "react";
import Style from "./style";

export default (props) => {
	const classes = Style();
	return (
		<div className={classes.root}>
			<img src={props.src} />
		</div>
	);
};
