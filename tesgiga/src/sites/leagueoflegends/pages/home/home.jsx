import React from "react";
import { Grid, ThemeProvider, Box } from "@material-ui/core";
import Components from "../../../../components/components";
import Style from "./style";

export default (props) => {
	const classes = Style();
	const Card = (props) => {
		return (
			<Grid item xs={6} sm={2} align="flex">
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
					src="https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt429f1a46bd589b2b/605b9ac25a03370f176ce46c/LoL_WR_KV_Banner_1920x1080.jpg"
					icon="https://static.wikia.nocookie.net/leagueoflegends/images/e/e5/Arcane_Comet_rune.png"
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
						src={
							"https://static.wikia.nocookie.net/liberproeliis/images/4/4d/Akali.png"
						}
					/>
					<Card
						onClick={() => (window.location.href = "/titandraft")}
						title={"Titan Draft"}
						src={
							"https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d398176b-315f-45d5-9933-bdac77db56ab/da0xy1f-55b1cad8-2442-4570-98a9-460635c554b5.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2QzOTgxNzZiLTMxNWYtNDVkNS05OTMzLWJkYWM3N2RiNTZhYlwvZGEweHkxZi01NWIxY2FkOC0yNDQyLTQ1NzAtOThhOS00NjA2MzVjNTU0YjUucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.-NKSX5fnN9glTXVV-7ToNxjQJ48b8QSs-mguayc-VKc"
						}
					/>
					<Card
						onClick={() => (window.location.href = "/articles")}
						title={"News & Articles"}
						src={
							"https://lolstatic-a.akamaihd.net/frontpage/apps/prod/harbinger-l10-website/en-au/production/en-au/static/fighter-7a08920b696ecdb673edeeae1d3c616e.png"
						}
					/>
					<Card
						onClick={() => (window.location.href = "/staff")}
						title={"TES Staff"}
						src={
							"https://lolstatic-a.akamaihd.net/frontpage/apps/prod/harbinger-l10-website/en-us/production/en-us/static/marksman-b339ed8fd7e04ff2c3fca022c5d299fb.png"
						}
					/>
					<Card
						onClick={() => (window.location.href = "/community")}
						title={"Community Hub"}
						src={
							"https://purepng.com/public/uploads/thumbnail//purepng.com-cyberpop-zoe-skinlolleague-of-legendsrenderzoecyberpop-331521945068typhq.png"
						}
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
						src={
							"https://i.pinimg.com/originals/d7/58/1b/d7581b2a1033309523d20c9d1a1f4589.png"
						}
					/>
					<Card
						onClick={() => (window.location.href = "/statistics")}
						title={"Conquerors"}
						src={
							"https://i.pinimg.com/originals/6a/10/c7/6a10c7e84c9f4e4aa9412582d28f3fd2.png"
						}
					/>
				</Grid>
				<Components.Footer />
			</div>
		</ThemeProvider>
	);
};
