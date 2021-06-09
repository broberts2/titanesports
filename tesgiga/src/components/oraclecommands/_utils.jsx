import React from "react";
import Components from "components/index";
import Labels from "labels";
import Style from "./style";

const Document = (props) => {
  const classes = Style();
  return (
    <Components.InteractiveCard>
      <div className={classes.document}>
        <img className={classes.floatImg} src={Labels.images.twitter} />
      </div>
    </Components.InteractiveCard>
  );
};

export default {
  Document,
};
