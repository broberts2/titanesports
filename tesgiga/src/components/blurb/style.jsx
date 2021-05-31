import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
	root: {
		padding: "100px",
		paddingTop: "0px",
		[theme.breakpoints.down("sm")]: {
			padding: "20px",
		},
	},
	title: {
		fontSize: theme.typography.h2.fontSize,
		[theme.breakpoints.down("sm")]: {
			fontSize: `calc(${theme.typography.h2.fontSize} / 2.5)`,
		},
	},
	body: {
		fontSize: theme.typography.h4.fontSize,
		[theme.breakpoints.down("sm")]: {
			fontSize: `calc(${theme.typography.h4.fontSize} / 3)`,
		},
	},
}));
