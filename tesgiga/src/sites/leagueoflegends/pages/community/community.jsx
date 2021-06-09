import React from "react";
import { Grid, ThemeProvider, Box, Switch } from "@material-ui/core";
import ArrowForwardRoundedIcon from "@material-ui/icons/ArrowForwardRounded";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import Components from "components/index";
import Style from "./style";

export default (props) => {
	const classes = Style();
	const [primarySelector, setPrimarySelector] = React.useState(false);
	const [positions, setPositions] = React.useState({
		top: true,
		jungle: true,
		middle: true,
		bottom: true,
		support: true,
	});
	const [playerToggles, setPlayerToggles] = React.useState({
		freeAgentsOnly: false,
		rosteredPlayersOnly: false,
	});
	const [pagination, setPagination] = React.useState(false);
	const posButton = (pos, text) => (
		<Grid
			item
			xs={4}
			sm={2}
			style={{
				opacity: !positions[pos] ? 0.3 : 1,
				transition: "all 0.5s ease",
			}}
		>
			<Components.PrimaryButton
				fill
				onClick={() =>
					setPositions(
						Object.assign({ ...positions }, { [pos]: !positions[pos] })
					)
				}
			>
				{text}
			</Components.PrimaryButton>
		</Grid>
	);
	React.useEffect(() => {
		props._();
		window.addEventListener("scroll", () => {
			setPagination(window.pageYOffset > 800 ? true : false);
		});
		return () => window.removeEventListener("scroll", () => {});
	});
	return (
		<ThemeProvider theme={Components.Themes.Dark}>
			<div className={classes.root}>
				<Components.Header cfg={"leagueoflegends"} setModal={props.setModal} />
				<Box
					className={classes.formSelector}
					display="flex"
					flexDirection="row-reverse"
				>
					<div style={{ margin: "25px" }}>
						<Components.Fab>
							<AddRoundedIcon fontSize="large" />
						</Components.Fab>
					</div>
				</Box>
				<Components.Ruby src="https://static.wikia.nocookie.net/leagueoflegends/images/d/d7/Summon_Aery_rune.png" />
				<Components.Blurb title={"Community Hub"}>
					Welcome to the TES Community Hub. Here, you will be able to browse all
					eligible League of Legends participants and their affiliations.
					Whether you're looking to recruit some new talent or seeking to join a
					team, this is the best way to get started. If you don't see yourself
					listed here, you will need to contact a staff member to get your
					account verified. If you've joined our discord server, you can
					directly message a roster staff member. Once verified, you will have
					the ability to fill out a short form describing your desired role and
					playstyle, viewable to the scouting community. We look forward to
					seeing you on Summoner's Rift!
				</Components.Blurb>
				<Grid container className={classes.primaryselector}>
					<Grid
						item
						xs={6}
						style={{
							opacity: primarySelector ? 0.3 : 1,
							transition: "all 0.5s ease",
						}}
					>
						<Components.PrimaryButton
							fill
							onClick={() => setPrimarySelector(false)}
						>
							Players
						</Components.PrimaryButton>
					</Grid>
					<Grid
						item
						xs={6}
						style={{
							opacity: !primarySelector ? 0.3 : 1,
							transition: "all 0.5s ease",
						}}
					>
						<Components.PrimaryButton
							fill
							onClick={() => setPrimarySelector(true)}
						>
							Teams
						</Components.PrimaryButton>
					</Grid>
				</Grid>
				<div className={classes.entities}>
					<div className={classes.search}>
						<Components.TextField label={"Search"} />
						<Components.Typography variant="h6">
							Positions
						</Components.Typography>
						<Grid container>
							{posButton("top", "Top")}
							{posButton("jungle", "Jungle")}
							{posButton("middle", "Middle")}
							{posButton("bottom", "Bottom")}
							{posButton("support", "Support")}
						</Grid>
						<Box display="flex">
							<div>
								<Components.Typography
									variant="h6"
									className={classes.typography6}
								>
									Free Agents Only
								</Components.Typography>
								<Components.Switch
									isChecked={playerToggles.freeAgentsOnly}
									setChecked={(bool) =>
										setPlayerToggles({
											freeAgentsOnly: !playerToggles.freeAgentsOnly,
											rosteredPlayersOnly: !bool,
										})
									}
								/>
							</div>
							<div style={{ marginLeft: "50px" }}>
								<Components.Typography
									variant="h6"
									className={classes.typography6}
								>
									Rostered Players Only
								</Components.Typography>
								<Components.Switch
									isChecked={playerToggles.rosteredPlayersOnly}
									setChecked={(bool) =>
										setPlayerToggles({
											rosteredPlayersOnly: !playerToggles.rosteredPlayersOnly,
											freeAgentsOnly: !bool,
										})
									}
								/>
							</div>
						</Box>
						<Components.PrimaryButton fill>Submit</Components.PrimaryButton>
					</div>
					<Grid container style={{ position: "relative" }}>
						<Components.MiniLoader loading={false} />
						{[1, 2, 3, 4, 5, 6, 7, 8].map((el) => (
							<Grid item xs={12} sm={6} md={4} lg={3}>
								<Components.CommunityCard />
							</Grid>
						))}
					</Grid>
				</div>
				<Box
					className={classes.fabs}
					style={!pagination ? { opacity: 0, pointerEvents: "none" } : {}}
				>
					<Box display="flex">
						<div className={classes.subfabs}>
							<Components.Fab>
								<ArrowBackRoundedIcon fontSize="large" />
							</Components.Fab>
						</div>
						<div className={classes.subfabs}>
							<Components.Fab>
								<ArrowForwardRoundedIcon fontSize="large" />
							</Components.Fab>
						</div>
					</Box>
					<Box display="flex" justifyContent="center">
						<Components.Typography variant="h4" className={classes.typography4}>
							Results 1 - 8 of 1200
						</Components.Typography>
					</Box>
				</Box>
				<Components.Footer />
			</div>
		</ThemeProvider>
	);
};
