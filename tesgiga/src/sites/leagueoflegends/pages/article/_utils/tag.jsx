import React from "react";
import Components from "components/index";
import Labels from "labels/index";
import Style from "../style";

const tagRouter = (tag) => {
  switch (tag) {
    case "pinned":
      return Labels.images.tags.pinned;
    case "rankings":
      return Labels.images.tags.rankings;
  }
};

export default (props) => {
  const classes = Style();
  return props.state.article.tags ? (
    props.state.editing ? (
      <Components.PrimaryButton
        onClick={() => props.cb(props.tag)}
        style={{
          opacity: props.state.article.tags.includes(props.tag) ? 1 : 0.35,
        }}
      >
        <img src={tagRouter(props.tag)} />
      </Components.PrimaryButton>
    ) : (
      <img
        src={tagRouter(props.tag)}
        style={{
          margin: 0,
          display: props.state.article.tags.includes(props.tag) ? "" : "none",
        }}
      />
    )
  ) : null;
};
