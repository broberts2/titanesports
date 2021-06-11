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
    radioValue: "titan.png",
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
        await GlobalActions.Requests.omniPost(
          state.textValue,
          state.radioValue === "none" ? null : state.radioValue
        );
        setState({
          checkBox: {
            twitter: false,
          },
          textValue: "",
          radioValue: "titan.png",
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
      <Components.RadioButton
        value={state.radioValue}
        items={["titan.png", "allstars.jpeg", "invitational.png", "none"]}
        row
        onChange={(radioValue) =>
          setState((lastState) => ({ ...lastState, radioValue }))
        }
      />
      <Components.TextField
        rows={6}
        multiline
        value={state.textValue}
        invertColor
        onChange={(textValue) =>
          setState((lastState) => ({ ...lastState, textValue }))
        }
      />
    </Utils.Document>
  );
};
