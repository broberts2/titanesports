import React from "react";
import { Box, Grid, ThemeProvider } from "@material-ui/core";
import Components from "../../../../components/components";
import Style from "./style";

export default (props) => {
	const classes = Style();
	const Card = (props) => (
		<Components.InteractiveCard fill onClick={() => null}>
			<Box className={classes.card}>
				<img className={classes.cardimg} src={props.data.img} />
				<Components.Typography variant="h2">
					<b>{props.data.name}</b>
				</Components.Typography>
				<Components.Typography variant="h4">
					{props.data.title}
				</Components.Typography>
				<Components.Typography variant="h3">
					{props.data.duty}
				</Components.Typography>
			</Box>
		</Components.InteractiveCard>
	);
	const buildSection = (title, data) => {
		return (
			<React.Fragment>
				<Components.Title>{title}</Components.Title>
				<Grid container>
					{data
						.sort((el1, el2) => (el1.name < el2.name ? -1 : 1))
						.map((el) => (
							<Grid item xs={12} md={4}>
								<Card
									data={{
										img: el.img,
										name: el.name,
										title: el.title,
										duty: el.duty,
									}}
								/>
							</Grid>
						))}
				</Grid>
			</React.Fragment>
		);
	};
	React.useEffect(() => props._());
	return (
		<ThemeProvider theme={Components.Themes.Dark}>
			<div className={classes.root}>
				<Components.Header cfg={"leagueoflegends"} />
				<Components.Ruby src="https://static.wikia.nocookie.net/leagueoflegends/images/4/46/Fleet_Footwork_rune.png" />
				<Components.Blurb title={"TES Staff"}>
					Welcome to the TES staff page. Here you will find all staff members
					responsible for TES - League of Legends operations.
				</Components.Blurb>
				{buildSection("Administrators", [
					{
						img: "https://static.wikia.nocookie.net/leagueoflegends/images/4/46/Fleet_Footwork_rune.png",
						name: "Phortwenty",
						title: "Administrator",
						duty: "Operations & Statistics",
					},
					{
						img: "https://static.wikia.nocookie.net/leagueoflegends/images/4/46/Fleet_Footwork_rune.png",
						name: "Major",
						title: "Administrator",
						duty: "Administrations",
					},
				])}
				{buildSection("Directors", [
					{
						img: "https://static.wikia.nocookie.net/leagueoflegends/images/4/46/Fleet_Footwork_rune.png",
						name: "Jetgorilla",
						title: "Director",
						duty: "Programming & Architecture",
					},
					{
						img: "https://static.wikia.nocookie.net/leagueoflegends/images/4/46/Fleet_Footwork_rune.png",
						name: "Mute",
						title: "Director",
						duty: "League Director",
					},
					{
						img: "https://static.wikia.nocookie.net/leagueoflegends/images/4/46/Fleet_Footwork_rune.png",
						name: "Sammy2Slap",
						title: "Director",
						duty: "Ban Appeals",
					},
					{
						img: "https://static.wikia.nocookie.net/leagueoflegends/images/4/46/Fleet_Footwork_rune.png",
						name: "Basically Cancer",
						title: "Director",
						duty: "League Director",
					},
					{
						img: "https://static.wikia.nocookie.net/leagueoflegends/images/4/46/Fleet_Footwork_rune.png",
						name: "Braer",
						title: "Director",
						duty: "",
					},
					{
						img: "https://static.wikia.nocookie.net/leagueoflegends/images/4/46/Fleet_Footwork_rune.png",
						name: "Zerobii",
						title: "Director",
						duty: "Player Integrity",
					},
					{
						img: "https://static.wikia.nocookie.net/leagueoflegends/images/4/46/Fleet_Footwork_rune.png",
						name: "Khyroe",
						title: "Director",
						duty: "Analytics",
					},
				])}
				{buildSection("Developers", [
					{
						img: "https://static.wikia.nocookie.net/leagueoflegends/images/4/46/Fleet_Footwork_rune.png",
						name: "LolGermRat",
						title: "Developer",
						duty: "Information Technology",
					},
					{
						img: "https://static.wikia.nocookie.net/leagueoflegends/images/4/46/Fleet_Footwork_rune.png",
						name: "Poptartism",
						title: "Developer",
						duty: "Graphic Design",
					},
				])}
				<Components.Footer />
			</div>
		</ThemeProvider>
	);
};
