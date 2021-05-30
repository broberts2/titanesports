import React from "react";
import { Box, ThemeProvider } from "@material-ui/core";
import Components from "../../components/components";
import _GlobalActions from "../../globalactions/index";
import Style from "./style";

export default (props) => {
	const classes = Style();
	const GlobalActions = _GlobalActions();
	return (
		<ThemeProvider theme={Components.Themes.Dark}>
			<div className={classes.root}>
				<Box display="flex" width={"100%"} height={"100%"}>
					<Box m="auto" style={{ textAlign: "center" }}>
						<Components.Ruby src="https://cdn.icon-icons.com/icons2/2224/PNG/512/discord_logo_icon_134445.png" />
						<Components.PrimaryButton
							fill
							onClick={() => GlobalActions.Utils.discordSignIn()}
						>
							Sign In
						</Components.PrimaryButton>
						<a
							href="https://discord.com/developers/docs/topics/oauth2"
							target="_blank"
						>
							<Components.Typography variant="h6">
								Learn more about OATH2
							</Components.Typography>
						</a>
					</Box>
				</Box>
			</div>
		</ThemeProvider>
	);
};
