import React from "react";
import Slide from "@material-ui/core/Slide";
import Labels from "../../../../labels/index";
import Utils from "../../_utils";

export default (props) => {
  return (
    <Slide direction="left" in={true} mountOnEnter unmountOnExit>
      <div>
        <Utils.Document
          data={props.data}
          img={Labels.images.zilean}
          category={"Community Feedback"}
        >
          <Utils.Blurb title={"Community Feedback"}>
            We here at TES do our best to provide our community with exicting,
            fair, and engaging content. However, we don't always hit our mark.
            If you have something you'd like to say, please submit a comment
            below. Our staff will be happy to read what you have to say! (Note:
            All submissions are fully anonymous)
          </Utils.Blurb>
          <Utils.InputLong isInput required>
            Submit your response here.
          </Utils.InputLong>
          <Utils.Submit />
        </Utils.Document>
      </div>
    </Slide>
  );
};
