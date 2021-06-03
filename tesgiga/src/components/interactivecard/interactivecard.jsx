import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import Style from "./style";

export default (props) => {
	const classes = Style(props)();
	return (
		<Card
			className={classes.root}
			onClick={() =>
				props.onClick && !props.disabled ? props.onClick() : null
			}
		>
			<CardContent style={{ height: "100%", paddingBottom: "75px" }}>
				<Box
					style={{ height: "100%" }}
					display="flex"
					flexDirection="column"
					justifyContent={
						props.controls & !props.onClick ? "flex-start" : "center"
					}
				>
					<div>{props.children}</div>
				</Box>
			</CardContent>
			{props.controls & !props.onClick ? (
				<Box display="flex" justifyContent="flex-end">
					<CardActions className={classes.cardActions}>
						{props.controls}
					</CardActions>
				</Box>
			) : (
				<div style={{ height: "0px" }} />
			)}
		</Card>
	);
};
