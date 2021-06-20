import Components from "components/index";
import React from "react";
import Labels from "labels/index";
import Style from "./style";

const Item = (props) => {
  return (
    <Components.Grid
      item
      xs={2}
      className={props.classes.item}
      onClick={() => {
        props.setActionId(props.i === props.active ? null : props.thisKey);
      }}
      style={{
        opacity: !props.active || props.i === props.active ? 1 : 0.25,
      }}
    >
      <div style={{ backgroundColor: "#020a15", padding: "5px" }}>
        <Components.Typography className={props.classes.title}>
          {props.data.name}
        </Components.Typography>
        <img src={Labels.dragontail.champions.tile(props.data.id)} />
      </div>
    </Components.Grid>
  );
};

export default (props) => {
  const classes = Style(props)();
  const [query, setQuery] = React.useState("");
  const [active, setActive] = React.useState(-1);
  const [pos, setPos] = React.useState({
    toplane: true,
    jungle: true,
    midlane: true,
    botlane: true,
    support: true,
  });
  const fCheck = (key) => {
    const reserved = props.state.history
      ? Object.values(props.state.history).map((el) => el.data)
      : [];
    if (reserved.includes(key)) {
      return false;
    }
    if (query && query.length > 0) {
      if (
        props.ChampionData[key].name.toLowerCase().includes(query.toLowerCase())
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };
  return (
    <div
      style={{
        height: "70%",
        width: "100%",
        position: "relative",
        display:
          props.finisheddate ||
          props.state.access !== props.state.draft.actingteam
            ? "none"
            : "",
      }}
    >
      <Components.Grid container spacing={2} className={classes.controls}>
        <Components.Grid item xs={6}>
          <Components.Grid container style={{ width: "100%" }} spacing={1}>
            {["toplane", "jungle", "midlane", "botlane", "support"].map(
              (el) => (
                <Components.Grid item xs={2}>
                  <Components.PrimaryButton
                    onClick={() =>
                      setPos((lastPos) => ({ ...lastPos, [el]: !pos[el] }))
                    }
                    style={{ opacity: pos[el] ? 1 : 0.25 }}
                  >
                    <img src={Labels.images[el]} className={classes.position} />
                  </Components.PrimaryButton>
                </Components.Grid>
              )
            )}
          </Components.Grid>
        </Components.Grid>
        <Components.Grid item xs={6}>
          <Components.TextField
            invertColor
            label={"shalom"}
            value={query}
            onChange={(e) => {
              props.setActionId(null);
              setActive(-1);
              setQuery(e);
            }}
          />
        </Components.Grid>
      </Components.Grid>
      <div
        style={{
          overflowY: "auto",
          height: "100%",
          width: "100%",
        }}
      >
        <Components.Grid container spacing={0} className={classes.root}>
          {props.ChampionData
            ? Object.keys(props.ChampionData)
                .filter((el) => fCheck(el))
                .sort((a, b) =>
                  props.ChampionData[a].name < props.ChampionData[b].name
                    ? -1
                    : 1
                )
                .map((key) => (
                  <Item
                    setActionId={(i) => props.setActionId(i)}
                    active={props.actionId}
                    i={key}
                    classes={classes}
                    thisKey={key}
                    data={props.ChampionData[key]}
                  />
                ))
            : null}
        </Components.Grid>
      </div>
    </div>
  );
};
