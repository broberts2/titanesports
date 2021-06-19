import React from "react";
import DraftComponents from "./components/index";
import Components from "components/index";
import Labels from "labels/index";
import Style from "./style";
import ___ from "../../actions/index";
import _ from "../../state/index";

export default (props) => {
  const classes = Style();
  const [state, __] = React.useState(_);
  const actions = ___(state, __);
  return (
    <div className={classes.root}>
      <div className={classes.innerroot}>
        <DraftComponents.HDCircle state={state} actions={actions} />
        <DraftComponents.Header state={state} actions={actions} />
        <DraftComponents.Body state={state} actions={actions} />
        <DraftComponents.Footer state={state} actions={actions} />
      </div>
    </div>
  );
};
