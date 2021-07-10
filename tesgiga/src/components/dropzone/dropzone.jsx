import React from "react";
import Components from "components/index";
import _GlobalActions from "globalactions/index";
import Dropzone from "react-dropzone";
import Style from "./style";

const GlobalActions = _GlobalActions("leagueoflegends");

export default (props) => {
	const classes = Style();
	return (
		<Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
			{({ getRootProps, getInputProps }) => (
				<div className={classes.root}>
					<Components.InteractiveCard onClick={() => null}>
						<div className={classes.droppane}>
							<Components.Box
								display="flex"
								justifyContent="center"
								alignItems="center"
								className={classes.dropiconwrapper}
							>
								<div className={classes.dropicon}>
									<Components.FontAwesome icon={"faCloudUploadAlt"} />
								</div>
							</Components.Box>
						</div>
					</Components.InteractiveCard>
				</div>
			)}
		</Dropzone>
	);
};
