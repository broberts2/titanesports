import React from "react";
import Components from "components/index";
import _GlobalActions from "globalactions/index";
import Utils from "../../_utils";
import Style from "./style";

const GlobalActions = _GlobalActions("admin");

export default (props) => {
  const classes = Style();
  const [state, setState] = React.useState({
    checkBox: {
      twitter: false,
    },
    textValue: "",
  });
  return (
    <Utils.Document
      title={"Omni Post"}
      description={"Posts a message to all selected social media."}
      validate={() =>
        Object.values(state.checkBox).some((e) => e) &&
        state.textValue.length > 0
      }
      onSubmit={async () => {
        await GlobalActions.Requests.omniPost(state.textValue);
        setState({
          checkBox: {
            twitter: false,
          },
          textValue: "",
        });
      }}
    >
      <Components.CheckBox
        row
        value={state.checkbox}
        items={["Twitter"]}
        onChange={(checkBox) =>
          setState((lastState) => ({ ...lastState, checkBox }))
        }
      />
      <Components.TextField
        rows={6}
        multiline
        value={state.textValue}
        onChange={(textValue) =>
          setState((lastState) => ({ ...lastState, textValue }))
        }
      />
    </Utils.Document>
  );
};
