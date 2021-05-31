import { TextField } from "@material-ui/core";
import React from "react";
import Style from "./style";

export default (props) => {
	const classes = Style(props)();
	return (
		<form className={classes.root} noValidate autoComplete="false">
			<TextField
				id="standard-basic"
				style={{ width: "100%" }}
				value={props.value}
				InputProps={{
					classes: {
						input: classes.inputProps,
					},
				}}
				onChange={(e) =>
					props.onChange ? props.onChange(e.target.value) : null
				}
				label={props.label}
			/>
		</form>
	);
};
