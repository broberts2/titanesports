import Components from "components/index";
import React from "react";
import Labels from "labels/index";
import Style from "./style";

export default (props) => {
  const classes = Style();
  return (
    <Components.Grid container spacing={1} className={classes.root}>
      {Object.values(props.items).map((el) => (
        <Components.Grid item xs={12}>
          <div className={classes.item}>
            {el ? (
              <React.Fragment>
                <img src={Labels.dragontail.champions.splash(el.img)} />
                <Components.Typography className={classes.title}>
                  {el.title}
                </Components.Typography>
                <Components.Typography className={classes.subtitle}>
                  {el.subtitle}
                </Components.Typography>
              </React.Fragment>
            ) : null}
          </div>
        </Components.Grid>
      ))}
    </Components.Grid>
  );
};
