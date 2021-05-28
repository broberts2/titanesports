import React from "react";
import { Switch } from "@material-ui/core";
import Style from "./style";

export default (props) => {
	const classes = Style();
	return (
		<Switch
			checked={props.isChecked}
			onChange={(checked) =>
				props.setChecked ? props.setChecked(checked) : null
			}
			color="primary"
			name="checkedB"
			inputProps={{ "aria-label": "primary checkbox" }}
		/>
	);
};
