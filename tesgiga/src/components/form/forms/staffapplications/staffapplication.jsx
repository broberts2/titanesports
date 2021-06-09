import React from "react";
import Labels from "labels/index";
import Components from "components/index";
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
          img={Labels.images.poppy}
          category={"Staff Applications"}
        >
          <Utils.Blurb title={"Titan Esports Staff/Developers Application"}>
            We are looking for mature members from our esteemed community to
            assist our league with managerial and admin duties. Not only will
            this allow for our league to run as smoothly as possible but also
            further strengthen a league built on collaboration. If you're
            interested, please fill out the form below. An interview process
            will also need to be completed.
          </Utils.Blurb>
          <Utils.Input isInput required>
            League of Legends Summoner Name (IGN).
          </Utils.Input>
          <Utils.Input isInput required>
            Discord Username.
          </Utils.Input>
          <Utils.CheckboxInput
            isInput
            required
            row
            title={"Please select any skills that apply to you."}
            items={[
              "Coding experience",
              "Graphical design",
              "Social media management",
              "Website management",
              "Data analysis/Microsoft office",
              "Shoutcasting/Video content creation",
              "Community organization",
              "Promotional material",
              "I just crawled out of this cave, but I can make fire.",
            ]}
          />
          <Utils.CheckboxInput
            isInput
            required
            row
            title={
              "Please select any positions you would like to participate in."
            }
            items={[
              "Roster staff",
              "Twitch/Discord moderator",
              "Player scouting",
              "Content creator",
              "Shoutcasting",
            ]}
          />
          <Utils.Submit />
        </Utils.Document>
      </div>
    </Components.Transitions>
  );
};
