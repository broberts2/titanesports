import Components from "components/index";
import Labels from "labels/index";
import Style from "./style";

export default (props) => {
  const classes = Style();
  return (
    <Components.Grid
      container
      direction="row"
      alignItems="flex-start"
      justify="center"
      className={classes.header}
    >
      <Components.Grid item xs={5} style={{ height: "100%" }}>
        <div className={classes.titlebar} style={{ textAlign: "left" }}>
          <Components.TitleBar
            width={"75%"}
            height={"60px"}
            skew={10}
            color={"green"}
          >
            {props.state.blueteam.name}
          </Components.TitleBar>
          <div style={{ textAlign: "right", height: "100%" }}>
            <img
              src={Labels.images[props.state.blueteam.logo]}
              className={classes.titlebarImg}
              style={{ display: !props.state.blueteam.logo ? "none" : "" }}
            />
          </div>
        </div>
      </Components.Grid>
      <Components.Grid
        item
        xs={2}
        style={{ textAlign: "center", height: "100%" }}
      >
        <img src={Labels.images.conquerorlogo} className={classes.logoImg} />
      </Components.Grid>
      <Components.Grid item xs={5} style={{ height: "100%" }}>
        <div className={classes.titlebar} style={{ textAlign: "right" }}>
          <Components.TitleBar
            width={"75%"}
            height={"60px"}
            skew={-10}
            color={"red"}
          >
            {props.state.redteam.name}
          </Components.TitleBar>
          <div style={{ textAlign: "left", height: "100%" }}>
            <img
              src={Labels.images[props.state.redteam.logo]}
              className={classes.titlebarImg}
              style={{ display: !props.state.blueteam.logo ? "none" : "" }}
            />
          </div>
        </div>
      </Components.Grid>
    </Components.Grid>
  );
};
