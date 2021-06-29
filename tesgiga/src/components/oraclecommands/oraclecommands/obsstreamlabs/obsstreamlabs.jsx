import React from "react";
import Components from "components/index";
import _GlobalActions from "globalactions/index";
import Utils from "../../_utils";
import Style from "./style";

const GlobalActions = _GlobalActions("admin");

export default (props) => {
	const classes = Style();
	const [clientStatus, setClientStatus] = React.useState(false);
	React.useEffect(async () => {
		const streamlabsstatus = await GlobalActions.Requests.queryOBSStreamlabs();
		setClientStatus(streamlabsstatus.result);
	}, []);
	return (
		<Utils.Document
			title={"OBS Streamlabs"}
			description={"Streamlabs control board."}
			validate={() => false}
			onSubmit={async () => null}
		>
			<div className={classes.clientStatus}>
				<Components.Typography variant="h6">
					Client Status
				</Components.Typography>
				<Components.Typography
					style={{ color: clientStatus ? "green" : "red" }}
				>
					{clientStatus ? "Online" : "Offline"}
				</Components.Typography>
			</div>
			<Components.Typography>Client Control</Components.Typography>
			<Components.PrimaryButton
				style={clientStatus ? { opacity: 0.35, pointerEvents: "none" } : {}}
				onClick={async () => {
					await GlobalActions.Requests.setOBSStreamlabs(true);
					setTimeout(async () => {
						const streamlabsstatus =
							await GlobalActions.Requests.queryOBSStreamlabs();
						setClientStatus(streamlabsstatus.result);
					}, 3000);
				}}
			>
				Turn On
			</Components.PrimaryButton>
			<Components.PrimaryButton
				style={!clientStatus ? { opacity: 0.35, pointerEvents: "none" } : {}}
				onClick={async () => {
					await GlobalActions.Requests.setOBSStreamlabs(false);
					setTimeout(async () => {
						const streamlabsstatus =
							await GlobalActions.Requests.queryOBSStreamlabs();
						setClientStatus(streamlabsstatus.result);
					}, 3000);
				}}
			>
				Turn Off
			</Components.PrimaryButton>
		</Utils.Document>
	);
};
