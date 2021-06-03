import React from "react";
import { Grid, ThemeProvider, Box } from "@material-ui/core";
import Components from "../../../../components/components";
import Labels from "../../../../labels/index";
import Style from "./style";

export default (props) => {
	const classes = Style();
	const Card = (props) => {
		return (
			<Grid item xs={6} md={4} lg={3} xl={2} align="flex">
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
				<Components.Header cfg={"leagueoflegends"} setModal={props.setModal} />
				<Components.Banner
					src={Labels.backgrounds.kindred}
					icon={Labels.images.comet}
				/>
				<Components.Block>
					Titan eSports Is An Amateur eSports Organization That Brings
					Competitive League of Legends Gameplay To All Skill Levels
				</Components.Block>
				<Grid
					container
					spacing={0}
					className={classes.majorsub2}
					align="center"
					justify="center"
				>
					<Card
						onClick={() => (window.location.href = "/statistics")}
						title={"Statistics"}
						src={Labels.images.zed}
					/>
					<Card
						onClick={() => (window.location.href = "/titandraft")}
						title={"Titan Draft"}
						src={Labels.images.azir}
					/>
					<Card
						onClick={() => (window.location.href = "/articles")}
						title={"News & Articles"}
						src={Labels.images.yasuo}
					/>
					<Card
						onClick={() => (window.location.href = "/staff")}
						title={"TES Staff"}
						src={Labels.images.jinx}
					/>
					<Card
						onClick={() => (window.location.href = "/applications")}
						title={"Applications"}
						src={Labels.images.zoe}
					/>
				</Grid>
				<Components.Blurb title={"What is TES all about?"}>
					Lorem Ipsum is simply dummy text of the printing and typesetting
					industry. Lorem Ipsum has been the industry's standard dummy text ever
					since the 1500s, when an unknown printer took a galley of type and
					scrambled it to make a type specimen book. It has survived not only
					five centuries, but also the leap into electronic typesetting,
					remaining essentially unchanged. It was popularised in the 1960s with
					the release of Letraset sheets containing Lorem Ipsum passages, and
					more recently with desktop publishing software like Aldus PageMaker
					including versions of Lorem Ipsum
				</Components.Blurb>
				<Components.Block>Summer Leagues</Components.Block>
				<Grid
					container
					spacing={0}
					className={classes.majorsub2}
					align="center"
					justify="center"
				>
					<Card
						onClick={() => (window.location.href = "/divinity")}
						title={"Divinity"}
						src={Labels.images.gold}
					/>
					<Card
						onClick={() => (window.location.href = "/conquerors")}
						title={"Conquerors"}
						src={Labels.images.diamond}
					/>
				</Grid>
				<Components.Footer />
			</div>
		</ThemeProvider>
	);
};
