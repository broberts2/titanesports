import React from "react";
import { ThemeProvider } from "@material-ui/core";
import Components from "components/index";
import Labels from "labels/index";
import _GlobalActions from "globalactions/index";
import Style from "./style";

const GlobalActions = _GlobalActions("leagueoflegends");

export default (props) => {
	const classes = Style();
	const [permissions, setPermissions] = React.useState(null);
	React.useEffect(async () => {
		const permissions = await GlobalActions.Requests.getMyPermissions();
		setPermissions(permissions);
		props._();
	}, []);
	return (
		<ThemeProvider theme={Components.Themes.Dark}>
			<div className={classes.root}>
				<Components.Header cfg={"leagueoflegends"} setModal={props.setModal} />
				<Components.Ruby src={"faYoutube"} />
				<Components.Blurb title={"Video Upload"}>
					Upload your best clips to our content creation team! Our content
					creators are always looking for material for their next awesome video!
				</Components.Blurb>
				<Components.Box
					display="flex"
					justifyContent="center"
					className={classes.videoupload}
				>
					{permissions ? (
						<div className={classes.sub}>
							<Components.Dropzone domain={"leagueoflegends"} />
						</div>
					) : (
						<div className={classes.sub}>
							<img src={Labels.images.lethaltempo} />
							<Components.Typography variant="h4">
								You must be signed in to upload videos.
							</Components.Typography>
						</div>
					)}
				</Components.Box>
				<Components.Footer />
			</div>
		</ThemeProvider>
	);
};
