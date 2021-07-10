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
				<Components.Ruby src={Labels.images.divinitylogo} img />
				<Components.Blurb title={"Divinity League"}>
					Sign up now for the pre-made Gold 1 99 LP Divinity League where 10
					teams battle it out to find out who has what it takes to be the 2021
					Divinity Summer Invitational Champions and win a portion of the $100
					prize pool. All team entries are $10 each.
					<br />
					<br />
					<a
						href="https://leagueoflegends.titan-esports.org/applications?form=divinity"
						target="_blank"
					>
						https://leagueoflegends.titan-esports.org/applications?form=divinity
					</a>
				</Components.Blurb>
				<Components.Box display="flex" justifyContent="center">
					<img className={classes.promo} src={Labels.images.divinity} />
				</Components.Box>
				<Components.Footer />
			</div>
		</ThemeProvider>
	);
};
