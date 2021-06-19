import React from "react";
import Components from "components/index";
import Labels from "labels/index";
import Style from "./style";

export default (props) => {
  const classes = Style();
  return (
    <div className={classes.root}>
      <div className={classes.innerroot}>
        <div className={classes.body}>
          <img src={Labels.images.logo} className={classes.baddraftImg} />
          <Components.Typography
            variant="h3"
            className={classes.baddraftTypographyTitle}
          >
            The draft you're looking for does not exist.
          </Components.Typography>
        </div>
      </div>
    </div>
  );
};
