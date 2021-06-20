import Components from "components/index";
import React from "react";
import Labels from "labels/index";
import Style from "./style";

export default (props) => {
  const classes = Style(props)();
  let items = Object.values(props.items);
  items = props.reverse ? items.reverse() : items;
  return (
    <Components.Grid
      container
      spacing={1}
      direction={props.reverse ? "row-reverse" : "row"}
      className={classes.root}
    >
      {items.map((el, i) => (
        <Components.Grid item xs={2}>
          <div className={classes.item}>
            <video
              style={{
                display:
                  props.nextAction &&
                  props.team === props.nextAction.team &&
                  props.action === props.nextAction.action &&
                  (props.reverse ? 4 - i : i) === props.nextAction.index
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
                <div className={classes.title}>
                  <Components.Typography>{el.title}</Components.Typography>
                </div>
              </React.Fragment>
            ) : null}
          </div>
        </Components.Grid>
      ))}
    </Components.Grid>
  );
};
