import React from "react";
import Utils from "../../_utils";

export default (props) => {
	return (
		<Utils.Document
			data={props.data}
			img={
				"https://static.wikia.nocookie.net/leagueoflegends/images/7/79/Phase_Rush_rune.png"
			}
			category={"Staff Applications"}
		>
			<Utils.Blurb
				title={"Titan Esports 2021 Spring Invitational Lottery Application"}
			>
				We're excited to announce our 2021 Spring Invitational Tournament! In
				addition to filling out this application form, we ask for all
				players/teams to please join the Titan Esports Discord (
				<a href="https://discord.gg/qBKJ2ky" target="_blank">
					https://discord.gg/qBKJ2ky
				</a>
				). This is required during tournament games. See League details below.
			</Utils.Blurb>
			<Utils.Blurb title={"League Types"}>
				League name: Titan League
				<br />
				Player cap: Players can not have surpassed Platinum III in Season 10 or
				11
				<br />
				Tournament type: best of 3 series
				<br />
				Day/Time: Mondays @ 8 EST, starts on February 22nd, 2021
				<br />
				Regular Season length: 9 weeks
				<br />
				Number of teams: 10
				<br />
				Playoffs length: 4 weeks
				<br />
				• Gauntlet – Bo1 single elimination matches
				<br />
				• Week 1 – Quarterfinals (best of 3 series)
				<br />
				• Week 2 – Semifinals (best of 5 series)
				<br />• Week 3 – Finals (best of 5 series)
			</Utils.Blurb>
			<Utils.Input isInput required>
				What is your League of Legends IGN?
			</Utils.Input>
			<Utils.Input isInput required>
				Link to your OP.gg
			</Utils.Input>
			<Utils.RadioInput
				isInput
				required
				row
				title={"Did you play in a previous TES Invitational tournament?"}
				items={["Yes", "No"]}
			/>
			<Utils.RadioInput
				isInput
				required
				row
				title={"Please select your primary position."}
				items={[
					"Top Lane",
					"Jungle",
					"Mid Lane",
					"ADC",
					"Support",
					"Fill",
					"Substitute",
				]}
			/>
			<Utils.CheckboxInput
				isInput
				required
				row
				title={"Please select any secondary positions you’re willing to play."}
				items={[
					"Top Lane",
					"Jungle",
					"Mid Lane",
					"ADC",
					"Support",
					"Fill",
					"Substitute",
					"None",
				]}
			/>
			<Utils.CheckboxInput
				isInput
				required
				row
				title={
					"Are there any positions you CAN NOT play? While we will strongly work towards giving every applicant their primary or secondary position(s), this objective will not always be obtainable."
				}
				items={[
					"Top Lane",
					"Jungle",
					"Mid Lane",
					"ADC",
					"Support",
					"Fill",
					"Substitute",
					"None",
				]}
			/>
			<Utils.Input isInput required>
				List any additional accounts over level 30 (additional accounts MUST be
				disclosed to TES admin/staff or could result in your disqualification
				from the league).
			</Utils.Input>
			<Utils.Submit />
		</Utils.Document>
	);
};
