import React from "react";
import Components from "components/index";
import CircularProgress from "@material-ui/core/CircularProgress";
import _GlobalActions from "globalactions/index";
import { useDropzone } from "react-dropzone";
import Style from "./style";

export default (props) => {
	const classes = Style();
	const GlobalActions = _GlobalActions(props.domain);
	const [status, setStatus] = React.useState("dropicon");
	const [data, setData] = React.useState(null);
	const [snack, setSnack] = React.useState({
		open: false,
		message: "",
		severity: null,
	});
	const onDrop = React.useCallback((f) => {
		setStatus(null);
		setData(f[0]);
		console.log(f[0]);
		setTimeout(() => setStatus("video"), 1);
	}, []);
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		multiple: false,
	});
	const setComp = () => {
		switch (status) {
			case "dropicon":
				return <Components.FontAwesome icon={"faCloudUploadAlt"} />;
			case "video":
				return <Components.FontAwesome icon={"faFilm"} />;
			case "spinner":
				return <CircularProgress size={80} className={classes.spinner} />;
			default:
				<div />;
		}
	};
	const submit = async () => {
		if (window.confirm(`Upload '${"Some file name"}' to TES?`)) {
			setStatus("spinner");
			const res = await GlobalActions.Requests.videoSubmission(data);
			setStatus("dropicon");
			setData(null);
			setSnack({
				open: true,
				message: "Upload Successful!",
				severity: "success",
			});
		}
	};
	return (
		<div className={classes.root}>
			<Components.InteractiveCard
				fill={props.fill}
				invertColor={props.invertColor}
				onClick={() => null}
			>
				<div {...getRootProps()}>
					<input {...getInputProps()} />
					<div className={classes.droppane}>
						<Components.Box
							display="flex"
							justifyContent="center"
							alignItems="center"
							className={classes.dropiconwrapper}
						>
							<div className={classes[status]}>{setComp()}</div>
						</Components.Box>
						{data ? (
							<div style={{ textAlign: "left" }}>
								<Components.Typography>
									Title: {data.name}
								</Components.Typography>
								<Components.Typography>Type: {data.type}</Components.Typography>
								<Components.Typography>Size: {data.size}</Components.Typography>
							</div>
						) : null}
					</div>
				</div>
				{status === "video" ? (
					<Components.PrimaryButton fill onClick={() => submit()}>
						Submit
					</Components.PrimaryButton>
				) : null}
				<Components.Snack
					severity={snack.severity}
					close={() => {
						setSnack({ ...snack, open: false });
					}}
					open={snack.open}
				>
					{snack.message}
				</Components.Snack>
			</Components.InteractiveCard>
		</div>
	);
};
