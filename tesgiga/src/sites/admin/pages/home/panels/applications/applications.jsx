import { Box, Slide } from "@material-ui/core";
import React from "react";
import ArrowForwardRoundedIcon from "@material-ui/icons/ArrowForwardRounded";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import Components from "../../../../../../components/components";
import _GlobalActions from "../../../../../../globalactions/index";
import Style from "./style";
import Labels from "../../../../../../labels";

const GlobalActions = _GlobalActions("admin");

const RenderForm = (props) => {
	const Component = Components.Form[props.component];
	return (
		<Slide direction={props.slideDirection} in={true} index={props.index}>
			<div>
				<Component data={props.applications[props.index]} />
			</div>
		</Slide>
	);
};

export default (props) => {
	const classes = Style();
	const [state, setState] = React.useState({
		applications: [],
		index: 0,
	});
	React.useEffect(async () => {
		const res = await GlobalActions.Requests.getApplications(
			props.callout
		).then((res) => res.result.map((el) => (el.JSON = JSON.parse(el.JSON))));
		setState((lastState) => ({ ...lastState, applications: res }));
	}, [props.callout]);
	return (
		<div className={classes.root}>
			<div
				className={classes.close}
				style={{ display: state.applications.length < 1 ? "none" : "" }}
			>
				<Components.Fab
					onClick={() => {
						window.confirm("Delete Document?");
					}}
				>
					<CloseRoundedIcon fontSize="large" />
				</Components.Fab>
			</div>
			<Box display="flex" width={"100%"} height={"100%"}>
				<Box
					m="auto"
					style={{
						overflowY: state.applications.length > 0 ? "scroll" : "hidden",
						overflowX: "hidden",
					}}
					height={"100%"}
				>
					{state.applications.length > 0 ? (
						RenderForm(
							{
								component: props.component,
								applications: state.applications,
								slideDirection: "left",
								index: state.index,
							},
							(state) => setState((lastState) => ({ ...lastState, state }))
						)
					) : (
						<Box display="flex" width={"100%"} height={"100%"}>
							<Box m="auto">
								<img className={classes.poro} src={Labels.images.poro} />
							</Box>
						</Box>
					)}
					<Box
						className={classes.fabs}
						style={{ display: state.applications.length < 1 ? "none" : "" }}
					>
						<Box display="flex">
							<div
								className={classes.subfabs}
								style={{ opacity: state.index > 0 ? 1 : 0.3 }}
							>
								<Components.Fab
									onClick={() => {
										if (state.index > 0) {
											setState((lastState) => ({
												...lastState,
												index: state.index - 1,
											}));
										}
									}}
								>
									<ArrowBackRoundedIcon fontSize="large" />
								</Components.Fab>
							</div>
							<div
								className={classes.subfabs}
								style={{
									opacity:
										state.index < state.applications.length - 1 ? 1 : 0.3,
								}}
							>
								<Components.Fab
									onClick={() => {
										if (state.index < state.applications.length - 1) {
											setState((lastState) => ({
												...lastState,
												index: state.index + 1,
											}));
										}
									}}
								>
									<ArrowForwardRoundedIcon fontSize="large" />
								</Components.Fab>
							</div>
						</Box>
					</Box>
				</Box>
			</Box>
		</div>
	);
};
