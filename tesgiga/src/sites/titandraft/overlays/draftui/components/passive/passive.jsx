import Components from "components/index";
import Labels from "labels/index";
import Style from "./style";

export default (props) => {
  const classes = Style(props)();
  return (
    <div
      className={classes.root}
      style={{
        display: props.access === props.state.draft.actingteam ? "none" : "",
      }}
    >
      <Components.Grid container style={{ width: "100%" }}>
        <Components.Grid item xs={3}></Components.Grid>
        <Components.Grid item xs={6}>
          <img
            src={
              props.ChampionData
                ? Labels.dragontail.champions.splash(
                    Object.values(props.ChampionData)[0].id
                  )
                : ""
            }
            className={classes.championimg}
          />
        </Components.Grid>
        <Components.Grid item xs={3}></Components.Grid>
      </Components.Grid>
      <Components.Grid container style={{ width: "100%" }}>
        <Components.Grid item xs={2} />
        <Components.Grid item xs={8}>
          <Components.Grid container style={{ width: "100%" }}>
            <Components.Grid item xs={3}>
              <img src={""} className={classes.spellimg} />
            </Components.Grid>
            <Components.Grid item xs={3}>
              <img src={""} className={classes.spellimg} />
            </Components.Grid>
            <Components.Grid item xs={3}>
              <img src={""} className={classes.spellimg} />
            </Components.Grid>
            <Components.Grid item xs={3}>
              <img src={""} className={classes.spellimg} />
            </Components.Grid>
          </Components.Grid>
          <Components.Typography variant="h6">
            {props.ChampionData
              ? props.ChampionData[Object.values(props.ChampionData)[0].id]
                  .blurb
              : null}
          </Components.Typography>
        </Components.Grid>
        <Components.Grid item xs={2} />
      </Components.Grid>
    </div>
  );
};
