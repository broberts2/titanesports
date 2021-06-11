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
    const permissions = await GlobalActions.Requests.getMyPermissions();
    if (id !== "new") {
      const article = await GlobalActions.Requests.getArticles(id).then((res) =>
        res ? res[0] : null
      );
      if (id && article) {
        setState((lastState) => ({
          ...lastState,
          permissions,
          authorid: permissions._myId,
          article,
        }));
      } else {
        window.location = "/articles";
      }
    } else if (permissions.createArticles) {
      setState((lastState) => ({
        ...lastState,
        permissions,
        article: {
          bannerimgurl: Labels.backgrounds.otter,
          iconImgUrl: Labels.images.logo,
          published: false,
          title: "New Article Title",
          authorid: permissions._myId,
          subject: "",
          contentblocks: [],
        },
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
          {state.permissions.editArticles && !state.article.published ? (
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
          {state.permissions.publishArticles && id !== "new" ? (
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
          {state.permissions.deleteArticles && id !== "new" ? (
            <Components.PrimaryButton
              onClick={() =>
                fns.deleteArticle(state, (nState, nSnack) => {
                  if (state) setState({ ...state, ...nState });
                  if (snack) setSnack({ ...snack, ...nSnack });
                })
              }
            >
              Delete Article
            </Components.PrimaryButton>
          ) : null}
        </div>
        {state.editing ? (
          <div className={classes.editBannerButton}>
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
          <Title state={state} cb={update} />
          {state.article.contentblocks
            ? Object.values(state.article.contentblocks).map((block) => (
                <Block state={state} n={block.n} cb={update} />
              ))
            : null}
        </div>
        {state.editing ? (
          <Components.Box display="flex" flexDirection="row-reverse">
            <Components.PrimaryButton
              onClick={() =>
                fns.discardChanges(state, (article) =>
                  setState((lastState) => ({ ...lastState, article }))
                )
              }
            >
              Discard All
            </Components.PrimaryButton>
            <Components.PrimaryButton
              onClick={() =>
                fns[id === "new" ? "postArticle" : "updateArticle"](
                  state,
                  (nState, nSnack) => {
                    if (state) setState({ ...state, ...nState });
                    if (snack) setSnack({ ...snack, ...nSnack });
                  }
                )
              }
            >
              {id !== "new" ? "Update All" : "Create Article"}
            </Components.PrimaryButton>
          </Components.Box>
        ) : null}
        <Components.Snack
          severity={snack.severity}
          close={() => {
            if (snack.message === "Article creation successful") {
              window.location = `/article?id=${snack.id}`;
            } else if (snack.message === `Article deletion successful`) {
              window.location = `/articles`;
            }
            setSnack({ ...snack, open: false });
          }}
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
