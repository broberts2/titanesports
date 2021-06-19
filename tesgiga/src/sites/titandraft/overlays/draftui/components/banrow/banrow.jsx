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
      {items.map((el) => (
        <Components.Grid item xs={2}>
          <div className={classes.item}>
            {el ? (
              <React.Fragment>
                <img src={Labels.dragontail.champions.splash(el.img)} />
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
