import React from "react";
import { ThemeProvider } from "@material-ui/core";
import { Slide } from "@material-ui/core";
import Components from "../../../../components/components";
import Labels from "../../../../labels/index";
import Style from "./style";

export default (props) => {
	const classes = Style();
	const [radio, setRadio] = React.useState("Lottery Application");
	React.useEffect(() => props._());
	return (
		<ThemeProvider theme={Components.Themes.Dark}>
			<div className={classes.root}>
				<Components.Header cfg={"leagueoflegends"} setModal={props.setModal} />
				<Components.Ruby src={Labels.images.gold} />
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
				<div className={classes.radioButton}>
					<Components.RadioButton
						row
						onChange={(e) => setRadio(e)}
						value={radio}
						items={["Lottery Application", "Team Application"]}
					/>
				</div>
				{radio === "Lottery Application" ? (
					<Components.Form.LotteryApplication_Divinity />
				) : (
					<Components.Form.TeamApplication_Divinity />
				)}
				<Components.Footer />
			</div>
		</ThemeProvider>
	);
};
