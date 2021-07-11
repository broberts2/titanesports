import React from "react";
import { Box, ThemeProvider } from "@material-ui/core";
import Components from "components/index";
import Labels from "labels/index";
import _GlobalActions from "globalactions/index";
import Style from "./style";
import config from "config";

export default (props) => {
	const classes = Style();
	const GlobalActions = _GlobalActions();
	console.log(props);
	return (
		<ThemeProvider theme={Components.Themes.Dark}>
			<div className={classes.root}>
				<Box display="flex" width={"100%"} height={"100%"}>
					<Box m="auto" style={{ textAlign: "center" }}>
						<video
							className={classes.media}
							src={`${
								config.production
									? config.productionEndpoint
									: config.developementEndpoint
							}/static/uploads/${props.data.key
								.toLowerCase()
								.replace(" ", "")}/${props.data.name}`}
						/>
					</Box>
				</Box>
				<div
					className={classes.controls}
					style={{ display: !props.data.new ? "none" : "" }}
				>
					<Components.PrimaryButton
						style={{ pointerEvents: "none", opacity: 0.3 }}
						onClick={() => null}
					>
						New
					</Components.PrimaryButton>
				</div>
				<div
					className={classes.controls}
					style={{ display: props.data.new ? "none" : "" }}
				>
					<Components.PrimaryButton
						style={{ pointerEvents: "none", opacity: 0.3 }}
						onClick={() => null}
					>
						Update
					</Components.PrimaryButton>
					<Components.PrimaryButton
						onClick={() => {
							window.open(
								`${
									config.production
										? config.productionEndpoint
										: config.developementEndpoint
								}/static/uploads/${props.data.key
									.toLowerCase()
									.replace(" ", "")}/${props.data.name}`,
								"_blank"
							);
						}}
					>
						Download
					</Components.PrimaryButton>
					<Components.PrimaryButton
						style={{ pointerEvents: "none", opacity: 0.3 }}
						onClick={() => null}
					>
						Delete
					</Components.PrimaryButton>
				</div>
			</div>
		</ThemeProvider>
	);
};
