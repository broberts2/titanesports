import React from "react";
import { ThemeProvider } from "@material-ui/core";
import Components from "components/index";
import Labels from "../../../../labels/index";
import Style from "./style";

export default (props) => {
	const classes = Style();
	React.useEffect(() => props._());
	return (
		<ThemeProvider theme={Components.Themes.Dark}>
			<div className={classes.root}>
				<Components.Header cfg={"leagueoflegends"} setModal={props.setModal} />
				<Components.Ruby src={Labels.images.conquerorlogo} img />
				<Components.Blurb title={"Conqueror League"}>
					Sign up now for the pre-made Plat 1 99 LP Conqueror League where 10
					teams battle it out to find out who has what it takes to be the 2021
					Conqueror Summer Invitational Champions and win a portion of the $100
					prize pool. All team entries are $10 each.
					<br />
					<br />
					<a
						href="https://leagueoflegends.titan-esports.org/applications?form=conquerors"
						target="_blank"
					>
						https://leagueoflegends.titan-esports.org/applications?form=conquerors
					</a>
				</Components.Blurb>
				<Components.Box display="flex" justifyContent="center">
					<img className={classes.promo} src={Labels.images.conqueror} />
				</Components.Box>
				<Components.Footer />
			</div>
		</ThemeProvider>
	);
};
