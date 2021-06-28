import React from "react";
import Components from "components/index";
import Labels from "labels/index";
import Style from "./style";

export default (props) => {
  const classes = Style();
  const Item = (props) => {
    return (
      <Components.Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        className={classes.item}
      >
        <div style={{ padding: "20px" }}>
          <div style={{ width: "50%", margin: "auto" }}>
            <Components.FontAwesome icon={props.src} />
          </div>
          <Components.Typography variant="h4">
            {props.text}
          </Components.Typography>
          <Components.Typography>{props.subtext}</Components.Typography>
        </div>
      </Components.Box>
    );
  };
  return (
    <div className={classes.root}>
      <div className={classes.innerroot}>
        <Components.Box
          display="flex"
          flexDirection={"column"}
          justifyContent="center"
          alignItems="center"
          style={{ width: "100%", height: "100%" }}
        >
          <div style={{ width: "60%", marginBottom: "25px" }}>
            <Components.Typography variant="h3">
              This Titan Draft instance has already concluded. You may select a
              replay option below or jump right the end!
            </Components.Typography>
          </div>
          <Components.Grid container style={{ width: "60%", height: "35%" }}>
            <Components.Grid item xs={4}>
              <Components.InteractiveCard
                fill
                onClick={() => props.broadcastTransition("true")}
              >
                <Item
                  src={"faDragon"}
                  text={"True Replay"}
                  subtext={"Real-time replay of the draft, second by second."}
                />
              </Components.InteractiveCard>
            </Components.Grid>
            <Components.Grid item xs={4}>
              <Components.InteractiveCard
                fill
                onClick={() => props.broadcastTransition("choreographed")}
              >
                <Item
                  src={"faDragon"}
                  text={"Scripted"}
                  subtext={
                    "Choreographed replay of the draft, finishing in exactly 3 minutes."
                  }
                />
              </Components.InteractiveCard>
            </Components.Grid>
            <Components.Grid item xs={4}>
              <Components.InteractiveCard
                fill
                onClick={() => props.broadcastTransition("skip")}
              >
                <Item
                  src={"faDragon"}
                  text={"Results"}
                  subtext={"Jump right to the end and view the final draft."}
                />
              </Components.InteractiveCard>
            </Components.Grid>
          </Components.Grid>
        </Components.Box>
      </div>
    </div>
  );
};
