import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
	root: { backgroundColor: theme.palette.background.default },
	card: {
		textAlign: "center",
	},
	cardimg: {
		width: "50%",
	},
	typographyh2: {
		[theme.breakpoints.down("sm")]: {
			fontSize: `calc(${theme.typography.h3.fontSize} / 3)`,
		},
	},
	typographyh3: {
		[theme.breakpoints.down("sm")]: {
			fontSize: `calc(${theme.typography.h5.fontSize} / 3)`,
		},
	},
	typographyh4: {
		[theme.breakpoints.down("sm")]: {
			fontSize: `calc(${theme.typography.h4.fontSize} / 3)`,
		},
	},
}));
