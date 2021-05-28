import { makeStyles } from "@material-ui/core/styles";
import { blueGrey as primary } from "@material-ui/core/colors";

export default makeStyles((theme) => ({
	root: {
		width: "100vw",
		height: "100vh",
		backgroundImage:
			"url(https://basic-admin.basicagency.com/uploads/Work/Riot/Images/_1920xAUTO_crop_center-center_65_none/Riot-Case-Study-Hero-Image-Desktop.jpg)",
		background: "no-repeat",
		backgroundSize: "cover",
		overflowX: "hidden",
		typography: {
			color: "red",
		},
	},
	typographywelcometitle: {
		[theme.breakpoints.down("xs")]: {
			fontSize: theme.typography.h4.fontSize,
		},
		[theme.breakpoints.up("sm")]: {
			fontSize: theme.typography.h2.fontSize,
		},
	},
	typographywelcometext: {
		[theme.breakpoints.down("xs")]: {
			fontSize: theme.typography.h6.fontSize,
		},
		[theme.breakpoints.up("sm")]: {
			fontSize: theme.typography.h4.fontSize,
		},
	},
	typographycardtext: {
		[theme.breakpoints.up("sm")]: {
			fontSize: theme.typography.h4.fontSize,
		},
	},
	major: {
		padding: "40px",
		[theme.breakpoints.up("sm")]: {
			height: "100vh",
		},
	},
	majorsub: {
		height: "100%",
		width: "100%",
		paddingTop: "0px",
		paddingBottom: "25px",
	},
	majorsub2: {
		height: "100%",
		width: "100%",
	},
	items: {
		marginTop: "25px",
	},
	gridpanel: {
		backgroundColor: primary["900"],
		padding: "15px",
	},
	logo: {
		width: "50%",
	},
	cardimg: {
		width: "50%",
	},
}));
