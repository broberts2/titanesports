import React from "react";
import { ThemeProvider, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Components from "../../../../components/components";
import Labels from "../../../../labels/index";
import Style from "./style";

export default (props) => {
	const classes = Style();
	const Card = (props) => {
		return (
			<Grid item xs={6} sm={3}>
				<Components.InteractiveCard
					anim={props.anim}
					delay={props.delay}
					disabled={props.disabled}
					fill
					onClick={() => props.onClick()}
				>
					<img className={classes.cardimg} src={props.src} />
					<Components.Typography className={classes.typographycardtext}>
						{props.title}
					</Components.Typography>
				</Components.InteractiveCard>
			</Grid>
		);
	};
	React.useEffect(() => props._());
	return (
		<ThemeProvider theme={Components.Themes.Dark}>
			<div className={classes.root}>
				<Grid className={classes.grid} container spacing={0}>
					<Grid className={classes.major} item xs={12} sm={10}>
						<Grid
							container
							spacing={0}
							direction="row"
							className={classes.majorsub}
						>
							<Grid item xs={12}>
								<Box className={classes.content}>
									<Components.Typography
										anim={"grow"}
										delay={1500}
										className={classes.typographywelcometitle}
									>
										Welcome to Titan Esports
									</Components.Typography>
									<Components.Typography
										anim={"grow"}
										delay={2000}
										className={classes.typographywelcometext}
									>
										You've reached our games hub. Please select one of our
										currently supported games for new, tournaments, and more!
									</Components.Typography>
								</Box>
							</Grid>
							<Grid item xs={12}>
								<div className={classes.items}>
									<Grid
										container
										spacing={0}
										className={classes.majorsub2}
										align="center"
										justify="center"
									>
										<Card
											anim={"grow"}
											delay={1500}
											onClick={() =>
												(window.location = `${window.location.protocol}//leagueoflegends.${window.location.host}`)
											}
											title={"League of Legends"}
											src={Labels.images.lol}
										/>
										<Card
											disabled
											onClick={() => alert("Shalom")}
											title={"Valorant"}
											src={Labels.images.valorant}
										/>
										<Card
											disabled
											onClick={() => alert("Shalom")}
											title={"World of Warcraft"}
											src={Labels.images.worldofwarcraft}
										/>
										<Card
											disabled
											onClick={() => alert("Shalom")}
											title={"Valheim"}
											src={Labels.images.valheim}
										/>
									</Grid>
								</div>
							</Grid>
						</Grid>
					</Grid>
					<Grid className={classes.gridpanel} item xs={12} sm={2}>
						<Box
							style={{ height: "100%" }}
							display="flex"
							flexDirection="column"
							justifyContent="center"
						>
							<Grid container spacing={0} align="center" justify="center">
								<Grid item xs={12}>
									<Components.PrimaryButton
										anim={"grow"}
										delay={1500}
										fill
										onClick={() => window.open(Labels.discord)}
									>
										Discord
									</Components.PrimaryButton>
								</Grid>
								<Grid item xs={12}>
									<Components.PrimaryButton
										anim={"grow"}
										delay={2000}
										fill
										onClick={() => window.open(Labels.twitch)}
									>
										Twitch
									</Components.PrimaryButton>
								</Grid>
								<Grid item xs={12}>
									<Components.PrimaryButton
										anim={"grow"}
										delay={2500}
										fill
										onClick={() => window.open(Labels.twitter)}
									>
										Twitter
									</Components.PrimaryButton>
								</Grid>
								<Grid item xs={12}>
									<Components.PrimaryButton
										anim={"grow"}
										delay={3000}
										fill
										onClick={() => window.open(Labels.reddit)}
									>
										Reddit
									</Components.PrimaryButton>
								</Grid>
								<Grid item xs={12}>
									<Components.PrimaryButton
										anim={"grow"}
										delay={3500}
										fill
										onClick={() => window.open(Labels.youtube)}
									>
										Youtube
									</Components.PrimaryButton>
								</Grid>
								<Grid item xs={12}>
									<Components.PrimaryButton
										anim={"grow"}
										delay={4000}
										fill
										onClick={() => window.open(Labels.facebook)}
									>
										Facebook
									</Components.PrimaryButton>
								</Grid>
							</Grid>
						</Box>
					</Grid>
				</Grid>
			</div>
		</ThemeProvider>
	);
};
