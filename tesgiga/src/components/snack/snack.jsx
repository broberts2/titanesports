import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Style from "./style";

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default (props) => {
	const classes = Style();
	return (
		<Snackbar
			open={props.open}
			autoHideDuration={6000}
			onClose={() => props.close()}
		>
			<Alert severity={props.severity}>{props.children}</Alert>
		</Snackbar>
	);
};
