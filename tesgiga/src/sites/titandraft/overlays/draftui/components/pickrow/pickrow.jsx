import Components from "components/index";
import React from "react";
import Labels from "labels/index";
import Style from "./style";

export default (props) => {
  const classes = Style();
  return (
    <Components.Grid container spacing={1} className={classes.root}>
      {Object.values(props.items).map((el, i) => (
        <Components.Grid item xs={12}>
          <div className={classes.item}>
            <video
              style={{
                display:
                  props.nextAction &&
                  props.team === props.nextAction.team &&
                  props.action === props.nextAction.action &&
                  i === props.nextAction.index
                    ? ""
                    : "none",
              }}
              src={Labels.backgroundvideos[props.bgvideo]}
              className={classes.bgvideo}
              muted
              loop
              autoPlay
            />
            {el ? (
              <React.Fragment>
                <img
                  src={Labels.dragontail.champions.splash(el.img)}
                  className={classes.notnull}
                  style={{ display: !el.img ? "none" : "" }}
                />
                <img
                  src={Labels.images[props.nullimg]}
                  className={classes.null}
                  style={{ display: el.img ? "none" : "" }}
                />
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
