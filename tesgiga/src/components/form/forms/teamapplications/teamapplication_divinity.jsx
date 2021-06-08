import React from "react";
import Components from "components/components";
import Labels from "labels/index";
import Utils from "../../_utils";

export default (props) => {
  return (
    <Components.Transitions
      anim={"Slide"}
      direction="left"
      in={true}
      mountOnEnter
      unmountOnExit
    >
      <div>
        <Utils.Document
          data={props.data}
          img={Labels.images.oceandrake}
          category={"Team Applications - Divinity"}
        >
          <Utils.Blurb
            title={
              "Titan Esports 2021 Summer/Fall Invitational Team Application"
            }
          >
            We're back and excited to announce our 2021 Spring Invitational
            Tournament! In addition to filling out this application form, we ask
            for all players/teams to please join the Titan Esports Discord (
            <a href={"https://discord.gg/3g987Uz2"}>
              https://discord.gg/3g987Uz2
            </a>
            ). This is required during tournament games. See League details
            below.
          </Utils.Blurb>
          <Utils.Blurb title={"League Info"}>
            Player cap: Players can not have surpassed Platinum III in Season 10
            or 11
            <br />
            Tournament type: best of 3 series
            <br />
            Day/Time: Mondays @ 8 EST, starts on February 22nd, 2021
            <br />
            Regular season length: 9 weeks
            <br />
            Number of teams: 10
            <br />
            Playoffs length: 4 weeks
            <br />
            - Gauntlet: Single elimination (best of 1 matches)
            <br />
            - Week 1: Quarterfinals (best of 3 series)
            <br />
            - Week 2: Semifinals (best of 5 series)
            <br />- Week 3: Finals (best of 5 series)
          </Utils.Blurb>
          <Utils.Blurb title={"Organizational Teams"}>
            Teams that elect to join TES that are run as an organization (e.g.,
            esports teams that are affiliated with high schools, universities,
            LAN centers, proven entities, etc.) have full autonomy over the
            structure of their team (i.e., their rostered players). This DOES
            NOT exclude players being removed by TES admin/staff for competitive
            rulings or breaking Discord rules.
          </Utils.Blurb>
          <Utils.RadioInput
            isInput
            required
            row
            title={"Is your team affiliated with an organization?"}
            items={["Yes", "No"]}
          />
          <Utils.RadioInput
            isInput
            required
            row
            title={"Did you play in a previous TES Invitational tournament?"}
            items={["Yes", "No"]}
          />
          <Utils.Blurb title={"Team Application"}>
            We thank you for taking the time to fill out this application and
            look forward to a successful and entertaining tournament!
            Rules/guidelines are subject to change before the start of the
            season. All updates will be publicly broadcast to the TES community
            and Discord server.
          </Utils.Blurb>
          <Utils.Input isInput required>
            Team Name
          </Utils.Input>
          <Utils.Input isInput required>
            IGN of Team Manager/Captain
          </Utils.Input>
          <Utils.Input isInput required>
            Discord username (include full name with numbers) of Team
            Manager/Captain
          </Utils.Input>
          <Utils.Input isInput required>
            OP.gg link for Top Laner
          </Utils.Input>
          <Utils.Input isInput required>
            OP.gg link for Jungler
          </Utils.Input>
          <Utils.Input isInput required>
            OP.gg link for Mid Laner
          </Utils.Input>
          <Utils.Input isInput required>
            OP.gg link for ADC
          </Utils.Input>
          <Utils.Input isInput required>
            OP.gg link for Support
          </Utils.Input>
          <Utils.Input isInput required>
            OP.gg links for all Substitutes
          </Utils.Input>
          <Utils.Blurb title={"Entry Fee"}>
            Due to increasing overhead costs for shoutcasting, marketing, and
            server costs we do require a minimal entry fee from each team's
            captain/organization leader. <br />
            <br />
            - This fee is $10 PER TEAM and is due before the start of the league
            season
            <br />
            - Entry fees will contribute to the current split's prize pool
            <br />
            - 1st place team receives 50% of the entry fees
            <br />
            - 2nd place receives 25% of the entry fees
            <br />- remaining 25% will go towards operating costs
          </Utils.Blurb>
          <Utils.RadioInput
            isInput
            required
            row
            title={
              "Do you agree to the above rules and guidelines set forth by Titan Esports?"
            }
            items={["Yes", "No"]}
          />
          <Utils.Submit />
        </Utils.Document>
      </div>
    </Components.Transitions>
  );
};
