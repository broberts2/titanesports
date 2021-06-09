import React from "react";
import { ThemeProvider } from "@material-ui/core";
import Components from "components/index";
import _GlobalActions from "globalactions/index";
import Labels from "labels/index";
import Title from "./_utils/title";
import Block from "./_utils/block";
import Style from "./style";

const GlobalActions = _GlobalActions("leagueoflegends");

export default (props) => {
  const classes = Style();
  const id = GlobalActions.Utils.getUrlParameters().id;
  const [state, setState] = React.useState({
    article: {},
    editing: false,
    editingBanner: false,
    editingIcon: false,
  });
  React.useEffect(async () => {
    const article = await GlobalActions.Requests.getArticles(id).then((res) =>
      res ? res[0] : null
    );
    if (id && article) {
      setState((lastState) => ({
        ...lastState,
        article,
      }));
    } else {
      window.location = "/articles";
    }
    props._();
  }, []);
  return (
    <ThemeProvider theme={Components.Themes.Dark}>
      <div className={classes.root}>
        <Components.Header cfg={"leagueoflegends"} setModal={props.setModal} />
        <div
          style={{
            position: "absolute",
            zIndex: 1400,
            right: 0,
            display: "none",
          }}
        >
          <Components.PrimaryButton
            onClick={() =>
              setState((lastState) => ({
                ...lastState,
                editing: !state.editing,
              }))
            }
          >
            {state.editing ? "Disable Editing " : "Enable Editing"}
          </Components.PrimaryButton>
        </div>
        {state.editing ? (
          <div style={{ position: "absolute", zIndex: 1400 }}>
            {state.editingBanner ? (
              <Components.TextField
                value={state.article.bannerimgurl}
                onChange={(title) => null}
              />
            ) : null}
            <Components.PrimaryButton
              onClick={() =>
                setState((lastState) => ({
                  ...lastState,
                  editingBanner: !state.editingBanner,
                }))
              }
            >
              {state.editingBanner ? "Preview " : "Edit Banner Image"}
            </Components.PrimaryButton>
          </div>
        ) : null}
        <Components.Banner
          top
          src={state.article.bannerimgurl}
          icon={state.article.iconImgUrl}
        />
        {state.editing ? (
          <Components.Box align="center">
            {state.editingIcon ? (
              <Components.TextField
                value={state.article.iconImgUrl}
                onChange={(title) => null}
              />
            ) : null}
            <Components.PrimaryButton
              onClick={() =>
                setState((lastState) => ({
                  ...lastState,
                  editingIcon: !state.editingIcon,
                }))
              }
            >
              {state.editingIcon ? "Preview " : "Edit Icon Image"}
            </Components.PrimaryButton>
          </Components.Box>
        ) : null}
        <div className={classes.body}>
          <Title
            state={state}
            cb={(nS) => setState((lastState) => ({ ...lastState, nS }))}
          />
          {state.article.contentblocks
            ? Object.values(state.article.contentblocks).map((block) => (
                <Block
                  state={state}
                  n={block.n}
                  cb={(nS) =>
                    setState((lastState) => ({ ...lastState, ...nS }))
                  }
                />
              ))
            : null}
        </div>
        {state.editing ? (
          <Components.Box display="flex" flexDirection="row-reverse">
            <Components.PrimaryButton onClick={() => null}>
              Discard All
            </Components.PrimaryButton>
            <Components.PrimaryButton onClick={() => null}>
              Save All
            </Components.PrimaryButton>
          </Components.Box>
        ) : null}
        <Components.Footer />
      </div>
    </ThemeProvider>
  );
};
