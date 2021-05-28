import { createMuiTheme } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

export default createMuiTheme({
	palette: {
		primary: {
			main: grey[900],
		},
	},
	typography: {
		fontFamily: "Quicksand",
		fontWeightLight: 400,
		fontWeightRegular: 500,
		fontWeightMedium: 600,
		fontWeightBold: 700,
	},
});
