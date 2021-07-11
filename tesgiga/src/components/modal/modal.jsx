import { Box } from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import Modals from "modalbodies/index";
import React from "react";
import Style from "./style";

export default (props) => {
	const classes = Style();
	const Body = Modals[props.modal.body];
	React.useEffect(() =>
		props.modal.state ? disablePageScroll() : enablePageScroll()
	);
	return (
		<div
			className={classes.root}
			style={{
				pointerEvents: !props.modal.state ? "none" : "",
			}}
		>
			<div
				className={classes.backdrop}
				onClick={() =>
					!props.disableClickAway ? props.setModal({ state: false }) : null
				}
				style={{ opacity: props.modal.state ? 0.75 : 0 }}
			/>
			<Box display="flex" width={"100%"} height={"100%"}>
				<Box m="auto">
					<Slide in={props.modal.state}>
						<div className={classes.body}>
							{Modals[props.modal.body] ? (
								<Body data={props.modal.data} />
							) : (
								<div />
							)}
						</div>
					</Slide>
				</Box>
			</Box>
		</div>
	);
};
