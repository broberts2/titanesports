import React from "react";
import Style from "./style";

export default (props) => {
	const classes = Style();
	return (
		<div className={classes.root}>
			<div className={classes.background}>
				<img src={props.src} />
			</div>
			<div className={classes.icon}>
				<img src={props.icon} />
			</div>
		</div>
	);
};
