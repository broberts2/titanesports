import { TextField } from "@material-ui/core";
import React from "react";
import Style from "./style";

export default (props) => {
	const classes = Style(props)();
	return (
		<form className={classes.root} noValidate autoComplete="on">
			<TextField
				id="standard-basic"
				style={{ width: "100%" }}
				InputProps={{
					classes: {
						input: classes.inputProps,
					},
				}}
				label={props.label}
			/>
		</form>
	);
};
