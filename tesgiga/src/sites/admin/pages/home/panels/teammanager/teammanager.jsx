import { Box } from "@material-ui/core";
import React from "react";
import Components from "../../../../../../components/components";
import Style from "./style";

export default (props) => {
	const classes = Style();
	return <div className={classes.root}>Team Manager</div>;
};
