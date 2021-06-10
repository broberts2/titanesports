import React from "react";
import { ThemeProvider } from "@material-ui/core";
import Components from "components/index";
import _GlobalActions from "globalactions/index";
import Labels from "labels/index";
import Title from "./_utils/title";
import Block from "./_utils/block";
import Tag from "./_utils/tag";
import fns from "./_utils/fns";
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
    sending: false,
    permissions: {},
  });
  const [snack, setSnack] = React.useState({
    severity: null,
    open: false,
    message: null,
  });
  const update = (nS) => setState((lastState) => ({ ...lastState, ...nS }));
  React.useEffect(async () => {
    const article = await GlobalActions.Requests.getArticles(id).then((res) =>
      res ? res[0] : null
    );
    if (id && article) {
      const permissions = await GlobalActions.Requests.getMyPermissions();
      setState((lastState) => ({
        ...lastState,
        permissions,
        article,
      }));
    } else {
      window.location = "/articles";
    }
    props._();
  }, []);
  return (
    <ThemeProvider theme={Components.Themes.Dark}>
      <div
        className={classes.root}
        style={{ pointerEvents: state.sending ? "none" : "" }}
      >
        <Components.PageLoader />
        <Components.Header cfg={"leagueoflegends"} setModal={props.setModal} />
        <div
          style={{
            position: "absolute",
            zIndex: 1400,
            right: 0,
          }}
        >
          {state.permissions.editArticles ? (
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
          ) : null}
          {state.permissions.publishArticles ? (
            <Components.PrimaryButton
              onClick={(value) =>
                fns.publishArticle(state, (nState, nSnack) => {
                  if (state) setState({ ...state, ...nState });
                  if (snack) setSnack({ ...snack, ...nSnack });
                })
              }
            >
              {state.article.published ? "Un-Publish" : "Publish"}
            </Components.PrimaryButton>
          ) : null}
          {state.permissions.deleteArticles ? (
            <Components.PrimaryButton onClick={() => null}>
              Delete Article
            </Components.PrimaryButton>
          ) : null}
        </div>
        {state.editing ? (
          <div style={{ position: "absolute", zIndex: 1400 }}>
            {state.editingBanner ? (
              <Components.TextField
                value={state.article.bannerimgurl}
                onChange={(value) => fns.editBanner(state, value, update)}
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
        <div className={classes.tagsWrapper}>
          <Components.Box className={classes.tags}>
            {["pinned", "rankings"].map((el) => (
              <Tag
                state={state}
                tag={el}
                cb={(value) => fns.editTag(state, value, update)}
              />
            ))}
          </Components.Box>
        </div>
        {state.editing ? (
          <Components.Box align="center">
            {state.editingIcon ? (
              <div>
                <div style={{ display: "inline-flex" }}>
                  <Components.TextField
                    value={state.article.iconImgUrl}
                    onChange={(value) => fns.editIcon(state, value, update)}
                  />
                </div>
              </div>
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
                <Block state={state} n={block.n} cb={update} />
              ))
            : null}
        </div>
        {state.editing ? (
          <Components.Box display="flex" flexDirection="row-reverse">
            <Components.PrimaryButton onClick={() => null}>
              Discard All
            </Components.PrimaryButton>
            <Components.PrimaryButton
              onClick={() =>
                fns.updateArticle(state, (nState, nSnack) => {
                  if (state) setState({ ...state, ...nState });
                  if (snack) setSnack({ ...snack, ...nSnack });
                })
              }
            >
              Save All
            </Components.PrimaryButton>
          </Components.Box>
        ) : null}
        <Components.Snack
          severity={snack.severity}
          close={() => setSnack({ ...snack, open: false })}
          open={snack.open}
        >
          {snack.message}
        </Components.Snack>
        <div
          className={classes.miniloader}
          style={{ display: state.sending ? "" : "none" }}
        >
          <Components.CircularProgress style={{ color: "red" }} size={120} />
        </div>
        <Components.Footer />
      </div>
    </ThemeProvider>
  );
};
