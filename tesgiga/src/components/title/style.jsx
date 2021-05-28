import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
	root: {
		padding: "100px",
		[theme.breakpoints.down("sm")]: {
			padding: "20px",
		},
	},
	title: {
		fontSize: theme.typography.h3.fontSize,
		[theme.breakpoints.down("sm")]: {
			fontSize: `calc(${theme.typography.h3.fontSize} / 2.5)`,
		},
	},
}));
