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
				<Components.Ruby src="https://lolstatic-a.akamaihd.net/frontpage/apps/prod/preseason-2018/en_US/a6708b7ae3dbc0b25463f9c8e259a513d2c4c7e6/assets/img/runeBuilder/assets/construct/8200/construct.png" />
				<Components.Blurb title={"Statistics"}>
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
