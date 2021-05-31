import React from "react";
import { ThemeProvider } from "@material-ui/core";
import Components from "../../../../components/components";
import Style from "./style";

export default (props) => {
	const classes = Style();
	React.useEffect(() => props._());
	return (
		<ThemeProvider theme={Components.Themes.Dark}>
			<div className={classes.root}>
				<Components.Header cfg={"leagueoflegends"} setModal={props.setModal} />
				<Components.Ruby src="https://lh3.googleusercontent.com/BwP1lvXOvhUSJ27-jrgI9c2eywtrzCyvxl1SmkhFmI8s-h3t5MsAM_4nm9kijc7DZZY-98mbXpSk-_9Z7oh3vEztsE-KvzzbQNBMstXDK8sKE9rGRqHpXUaxZvoFWIlMCw=w1440" />
				<Components.Blurb title={"Divinity League"}>
					Lorem Ipsum is simply dummy text of the printing and typesetting
					industry. Lorem Ipsum has been the industry's standard dummy text ever
					since the 1500s, when an unknown printer took a galley of type and
					scrambled it to make a type specimen book. It has survived not only
					five centuries, but also the leap into electronic typesetting,
					remaining essentially unchanged. It was popularised in the 1960s with
					the release of Letraset sheets containing Lorem Ipsum passages, and
					more recently with desktop publishing software like Aldus PageMaker
					including versions of Lorem Ipsum.
				</Components.Blurb>
				<Components.Form.LotteryApplications />
				<Components.Footer />
			</div>
		</ThemeProvider>
	);
};
