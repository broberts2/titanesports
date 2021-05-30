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
				<Components.Ruby src="https://static.wikia.nocookie.net/leagueoflegends/images/a/a9/Unsealed_Spellbook_rune.png" />
				<Components.Blurb title={"News & Staff Articles"}>
					Welcome to the TES News & Articles section! Here you find our newest
					announcements, schedules, and seasonal power rankings. You'll also
					find many short blogs from staff members here detailing what they've
					been up to.
				</Components.Blurb>
				<Components.Footer />
			</div>
		</ThemeProvider>
	);
};
