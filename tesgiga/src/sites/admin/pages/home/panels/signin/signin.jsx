import { Box } from "@material-ui/core";
import React from "react";
import Components from "components/index";
import Style from "./style";

export default (props) => {
	const classes = Style();
	return (
		<div className={classes.root}>
			<Box display="flex" width={"100%"} height={"100%"}>
				<Box m="auto">
					<Components.Ruby src="https://aj-r.github.io/api-challenge-2017/img/runesReforged/perk/8008.png" />
					<Components.Block>
						You must be signed in to access this portal
					</Components.Block>
				</Box>
			</Box>
		</div>
	);
};
