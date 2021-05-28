import React from "react";
import Style from "./style";
import Components from "../components";
import { Tooltip } from "@material-ui/core";

export default (props) => {
	const classes = Style();
	return (
		<Tooltip
			title={
				<Components.Typography variant="h6">
					{props.tooltip}
				</Components.Typography>
			}
			placement="bottom"
		>
			{props.children}
		</Tooltip>
	);
};
