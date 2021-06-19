import Components from "components/index";
import Labels from "labels/index";
import Style from "./style";

const Item = (props) => {
  return (
    <Components.Grid item xs={2} className={props.classes.item}>
      <Components.Typography className={props.classes.title}>
        Aatrox
      </Components.Typography>
      <img src={Labels.dragontail.champions.tile("Aatrox")} />
    </Components.Grid>
  );
};

export default (props) => {
  const classes = Style(props)();
  return (
    <div style={{ height: "75%", position: "relative" }}>
      <Components.Grid container spacing={2} className={classes.controls}>
        <Components.Grid item xs={6}>
          {["toplane", "jungle", "midlane", "botlane", "support"].map((el) => (
            <img src={Labels.images[el]} className={classes.position} />
          ))}
        </Components.Grid>
        <Components.Grid item xs={6}>
          <Components.TextField label={"shalom"} />
        </Components.Grid>
      </Components.Grid>
      <div style={{ overflowY: "auto", height: "100%" }}>
        <Components.Grid container spacing={1} className={classes.root}>
          {[
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
          ].map((el) => (
            <Item classes={classes} />
          ))}
        </Components.Grid>
      </div>
    </div>
  );
};
