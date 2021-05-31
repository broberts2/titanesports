import React from "react";
import { ThemeProvider, Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Components from "../../../../components/components";
import Labels from "../../../../labels/index";
import Style from "./style";
import labels from "../../../../labels";

export default (props) => {
	const classes = Style();
	React.useEffect(() => props._());
	return (
		<ThemeProvider theme={Components.Themes.Dark}>
			<div className={classes.root}>
				<Box display="flex" width={"100%"} height={"100%"}>
					<Box m="auto" style={{ textAlign: "center" }}>
						<img className={classes.poro} src={labels.images.poro} />
						<Components.Typography variant="h2">
							404 - Poro foul!
						</Components.Typography>
					</Box>
				</Box>
			</div>
		</ThemeProvider>
	);
};
