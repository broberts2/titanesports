import React from "react";
import Components from "components/index";
import _GlobalActions from "globalactions/index";
import Utils from "../../_utils";
import Style from "./style";
import config from "config";

const GlobalActions = _GlobalActions("admin");

const rn = (value) => {
	switch (value) {
		case "communityclips":
			return "Community Clips";
		case "teamlogos":
			return "Team Logos";
	}
};

export default (props) => {
	const classes = Style();
	const [uploads, setUploads] = React.useState({});
	const [key, setKey] = React.useState(null);
	const Card = (props) => {
		const src = (extension, el) => {
			const src = `${
				config.production
					? config.productionEndpoint
					: config.developementEndpoint
			}/static/uploads/${key.toLowerCase().replace(" ", "")}/${props.name}`;
			switch (extension) {
				case "mp4":
					return (
						<video className={classes.preview} src={src}>
							{el}
						</video>
					);
			}
		};
		return (
			<Components.Grid item xs={2}>
				<Components.InteractiveCard
					invertColor
					fill
					onClick={() =>
						props.setModal({
							state: true,
							body: "Media",
							data: { new: props.isLast, key: props.thisKey, name: props.name },
						})
					}
				>
					{props.isLast ? (
						<Components.Box
							display="flex"
							justifyContent="center"
							alignItems="center"
							style={{ width: "100%", height: "100%" }}
						>
							<div
								style={{
									width: "50%",
									height: "50%",
									transform: "translate(-0%, -50%)",
								}}
							>
								<Components.FontAwesome icon={"faPlusSquare"} />
							</div>
						</Components.Box>
					) : (
						<div>
							{src(props.name.split(".")[props.name.split(".").length - 1])}
							<div style={{ textAlign: "center" }}>
								<Components.Typography variant="h6">
									{props.name.split("___---___")[1]}
								</Components.Typography>
							</div>
						</div>
					)}
				</Components.InteractiveCard>
			</Components.Grid>
		);
	};
	React.useEffect(async () => {
		const uploads = await GlobalActions.Requests.getUploads();
		setUploads(uploads);
	}, []);
	const arr = key
		? uploads[key.toLowerCase().replace(" ", "")].concat("<add_item>")
		: [];
	return (
		<div className={classes.root}>
			<Utils.Document
				title={"Media Manager"}
				description={"Manage media uploaded by the community and staff."}
			>
				<Components.Picklist
					onChange={(id) => setKey(id)}
					invertColor
					items={Object.keys(uploads).map((el) => rn(el))}
					value={key}
					helpText={"Select a Directory"}
				/>
				<Components.Grid container>
					{arr.map((el) => (
						<Card
							thisKey={key}
							name={el}
							setModal={props.setModal}
							isLast={el === "<add_item>"}
						/>
					))}
				</Components.Grid>
			</Utils.Document>
		</div>
	);
};
