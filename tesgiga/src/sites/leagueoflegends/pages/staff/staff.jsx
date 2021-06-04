import React from "react";
import { Box, Grid, ThemeProvider } from "@material-ui/core";
import Components from "../../../../components/components";
import Style from "./style";

export default (props) => {
	const classes = Style();
	const Card = (props) => (
		<Components.InteractiveCard
			fill
			onClick={() =>
				props.data.id
					? window.open(`https://discord.com/channels/@me/${props.data.id}`)
					: null
			}
		>
			<Box className={classes.card}>
				<img className={classes.cardimg} src={props.data.img} />
				<Components.Typography className={classes.typographyh2} variant="h4">
					<b>{props.data.name}</b>
				</Components.Typography>
				<Components.Typography className={classes.typographyh3} variant="h6">
					{props.data.title}
				</Components.Typography>
				<Components.Typography className={classes.typographyh4} variant="h5">
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
							<Grid item xs={6} lg={3}>
								<Card
									data={{
										img: el.img,
										id: el.discordId,
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
				<Components.Header cfg={"leagueoflegends"} setModal={props.setModal} />
				<Components.Ruby src="https://static.wikia.nocookie.net/leagueoflegends/images/4/46/Fleet_Footwork_rune.png" />
				<Components.Blurb title={"TES Staff"}>
					Welcome to the TES staff page. Here you will find all staff members
					responsible for TES - League of Legends operations.
				</Components.Blurb>
				{buildSection("Administrators", [
					{
						img: "https://static.wikia.nocookie.net/leagueoflegends/images/4/46/Fleet_Footwork_rune.png",
						discordId: "405139546305593346",
						name: "Phortwenty",
						title: "Administrator",
						duty: "League Operations",
					},
				])}
				{buildSection("Directors", [
					{
						img: "https://static.wikia.nocookie.net/leagueoflegends/images/4/46/Fleet_Footwork_rune.png",
						discordId: "91010124667183104",
						name: "Braer",
						title: "Director",
						duty: "Game Development",
					},
					{
						img: "https://static.wikia.nocookie.net/leagueoflegends/images/4/46/Fleet_Footwork_rune.png",
						discordId: "650848077766459426",
						name: "DontEatBees",
						title: "Director",
						duty: "League Director",
					},
					{
						img: "https://static.wikia.nocookie.net/leagueoflegends/images/4/46/Fleet_Footwork_rune.png",
						discordId: "84522855248691200",
						name: "Jetgorilla",
						title: "Director",
						duty: "Programming & APIs",
					},
					{
						img: "https://static.wikia.nocookie.net/leagueoflegends/images/4/46/Fleet_Footwork_rune.png",
						discordId: "715789607358169119",
						name: "Mute",
						title: "Director",
						duty: "League Director",
					},
					{
						img: "https://static.wikia.nocookie.net/leagueoflegends/images/4/46/Fleet_Footwork_rune.png",
						discordId: "538489444064428042",
						name: "Qurkii",
						title: "Director",
						duty: "Finance",
					},
					{
						img: "https://static.wikia.nocookie.net/leagueoflegends/images/4/46/Fleet_Footwork_rune.png",
						discordId: "610630704652353579",
						name: "Sammy2Slap",
						title: "Director",
						duty: "Roster Staff",
					},
					{
						img: "https://static.wikia.nocookie.net/leagueoflegends/images/4/46/Fleet_Footwork_rune.png",
						discordId: "660741480834662415",
						name: "Zerobii",
						title: "Director",
						duty: "Player Integrity",
					},
				])}
				{buildSection("Developers", [
					{
						img: "https://static.wikia.nocookie.net/leagueoflegends/images/4/46/Fleet_Footwork_rune.png",
						discordId: "563966121578070018",
						name: "Khyroe",
						title: "Developer",
						duty: "Content Developer",
					},
					{
						img: "https://static.wikia.nocookie.net/leagueoflegends/images/4/46/Fleet_Footwork_rune.png",
						discordId: "801913137497374752",
						name: "LolGermRat",
						title: "Developer",
						duty: "Information Technology",
					},
					{
						img: "https://static.wikia.nocookie.net/leagueoflegends/images/4/46/Fleet_Footwork_rune.png",
						discordId: "679912644852973592",
						name: "Poptartism",
						title: "Developer",
						duty: "Graphic Design",
					},
				])}
				{buildSection("Staff", [
					{
						img: "https://static.wikia.nocookie.net/leagueoflegends/images/4/46/Fleet_Footwork_rune.png",
						discordId: "850209060753899550",
						name: "Kappa Krusader",
						title: "Staff",
						duty: "Moderator",
					},
				])}
				{buildSection("SHOUTCASTERS", [
					{
						img: "https://static.wikia.nocookie.net/leagueoflegends/images/4/46/Fleet_Footwork_rune.png",
						name: "JangoUltimus",
						title: "Shoutcaster",
						duty: "",
					},
					{
						img: "https://static.wikia.nocookie.net/leagueoflegends/images/4/46/Fleet_Footwork_rune.png",
						name: "MannyOrSonny",
						title: "Shoutcaster",
						duty: "",
					},
				])}
				<Components.Footer />
			</div>
		</ThemeProvider>
	);
};
