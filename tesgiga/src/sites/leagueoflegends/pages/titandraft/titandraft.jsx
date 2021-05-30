import React from "react";
import { ThemeProvider } from "@material-ui/core";
import Components from "../../../../components/components";
import Style from "./style";

export default (props) => {
	const classes = Style();
	React.useEffect(() => props._());
	return (
		<ThemeProvider theme={Components.Themes.Dark}>
			<div className={classes.root}>
				<Components.Header cfg={"leagueoflegends"} setModal={props.setModal} />
				<Components.Ruby src="http://opgg-static.akamaized.net/images/lol/perk/8112.png" />
				<Components.Blurb title={"Titan Draft"}>
					Welcome to the TES Titan draft. League of Legends does not allow
					players access to all champions (unless they have paid for them) in
					custom lobbies. A crucial part of competative League of Legends is the
					pick/ban phase where competitors take turns deciding what champions
					they will play as well as what champions the opposition cannot. This
					tool functions very similar to the widely popular 'Prodraft' utility,
					but with some additional quality of life changes and other TES server
					integrations.
				</Components.Blurb>
				<Components.Footer />
			</div>
		</ThemeProvider>
	);
};
