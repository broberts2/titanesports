import React from "react";
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Grid,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	ThemeProvider,
} from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import TimelineSharpIcon from "@material-ui/icons/TimelineSharp";
import OndemandVideoSharpIcon from "@material-ui/icons/OndemandVideoSharp";
import PanoramaOutlinedIcon from "@material-ui/icons/PanoramaOutlined";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import GamesRoundedIcon from "@material-ui/icons/GamesRounded";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import SettingsApplicationsRoundedIcon from "@material-ui/icons/SettingsApplicationsRounded";
import GroupWorkRoundedIcon from "@material-ui/icons/GroupWorkRounded";
import PeopleRoundedIcon from "@material-ui/icons/PeopleRounded";
import Divider from "@material-ui/core/Divider";
import Components from "../../../../components/components";
import Style from "./style";

const items = (
	classes,
	displayName,
	setDisplayName,
	setDisplayService,
	gsAccordion,
	setGsAccordion,
	isAuth
) => {
	const listItem = (key, displayName, icon, inactive) => (
		<ListItem
			className={classes.listitem}
			style={inactive ? { opacity: 0.3, pointerEvents: "none" } : {}}
			button
			key={key}
			onClick={() => {
				setDisplayName(displayName);
				setGsAccordion(false);
			}}
		>
			<ListItemIcon>{icon}</ListItemIcon>
			<ListItemText primary={displayName} />
		</ListItem>
	);
	return [
		{
			icon: <GamesRoundedIcon />,
			accordion: (
				<Accordion
					expanded={gsAccordion}
					onClick={() => setGsAccordion(!gsAccordion)}
				>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel1a-content"
						id="panel1a-header"
					>
						<Components.Typography>Games & Services</Components.Typography>
					</AccordionSummary>
					<AccordionDetails>
						<List>
							{listItem("li0", "Discord", <SettingsApplicationsRoundedIcon />)}
							{listItem("li1", "League of Legends", <SportsEsportsIcon />)}
							{listItem("li2", "Valorant", <SportsEsportsIcon />, true)}
							{listItem(
								"li3",
								"World of Warcraft",
								<SportsEsportsIcon />,
								true
							)}
							{listItem("li4", "Valheim", <SportsEsportsIcon />, true)}
						</List>
					</AccordionDetails>
				</Accordion>
			),
		},
		{
			divider: true,
		},
		displayName === "Discord"
			? {
					text: "Oracle",
					icon: <TimelineSharpIcon />,
					cb: () => setDisplayService("Oracle"),
			  }
			: null,
		displayName === "League of Legends"
			? {
					text: "OBS Streamlabs",
					icon: <OndemandVideoSharpIcon />,
					cb: () => setDisplayService("OBS Streamlabs"),
			  }
			: null,
		displayName === "League of Legends"
			? {
					text: "Team Manager",
					icon: <GroupWorkRoundedIcon />,
					cb: () => setDisplayService("Team Manager"),
			  }
			: null,
		displayName === "League of Legends"
			? {
					text: "Player Manager",
					icon: <PeopleRoundedIcon />,
					cb: () => setDisplayService("Player Manager"),
			  }
			: null,
		displayName === "League of Legends"
			? {
					text: "Media Manager",
					icon: <PanoramaOutlinedIcon />,
					cb: () => setDisplayService("Media Manager"),
			  }
			: null,
		isAuth
			? {
					text: "Sign Out",
					icon: <ExitToAppRoundedIcon />,
					cb: () => alert("was called"),
			  }
			: null,
	];
};

export default (props) => {
	const classes = Style();
	const [displayName, setDisplayName] = React.useState("Discord");
	const [displayService, setDisplayService] = React.useState("Oracle");
	const [gsAccordion, setGsAccordion] = React.useState(false);
	const [isAuth, setIsAuth] = React.useState({}); // assign an object here with permissions on successful auth
	const listItems = (arr) => (
		<List>
			{arr
				.filter((el) => el)
				.map((el) =>
					el.divider ? (
						<Divider />
					) : (
						<ListItem
							className={classes.listitem}
							button={!el.accordion}
							key={el.text}
							onClick={() => (el.cb ? el.cb() : null)}
						>
							<ListItemIcon>{el.icon}</ListItemIcon>
							{el.accordion ? el.accordion : <ListItemText primary={el.text} />}
						</ListItem>
					)
				)}
		</List>
	);
	React.useEffect(() => props._());
	return (
		<ThemeProvider theme={Components.Themes.Dark}>
			<div className={classes.root}>
				{isAuth && props.isLoaded ? (
					<Box style={{ width: "100%", height: "100%" }} flexDirection="row">
						<Box style={{ width: "362.5px" }}>
							<Drawer variant="permanent" anchor={"left"}>
								{listItems(
									items(
										classes,
										displayName,
										setDisplayName,
										setDisplayService,
										gsAccordion,
										setGsAccordion,
										isAuth
									)
								)}
							</Drawer>
						</Box>
						<div className={classes.displayName}>
							<Components.Typography anim={"grow"} variant="h4">
								{displayName}
							</Components.Typography>
							<Components.Typography anim={"grow"} variant="h6">
								{displayService}
							</Components.Typography>
						</div>
						<Box
							display="flex"
							justifyContent="center"
							alignItems="center"
							className={classes.content}
						>
							<div className={classes.innercontent}>
								<Components.Typography anim={"grow"} variant="h4">
									Stuff
								</Components.Typography>
							</div>
						</Box>
					</Box>
				) : (
					"you need to auth"
				)}
			</div>
		</ThemeProvider>
	);
};
