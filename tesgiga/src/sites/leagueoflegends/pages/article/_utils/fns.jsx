import _GlobalActions from "globalactions/index";
import { disablePageScroll, enablePageScroll } from "scroll-lock";

const GlobalActions = _GlobalActions("leagueoflegends");

const dropBlock = (state, i, cb) => {
  if (window.confirm("Are you sure you want to delete this block?")) {
    const newState = state;
    const contentblocks = {};
    delete newState.article.contentblocks[i];
    Object.values(newState.article.contentblocks).map((block, i) => {
      block.n = i;
      contentblocks[i] = block;
    });
    newState.article.contentblocks = contentblocks;
    cb(newState);
  }
};

const editBanner = (state, newValue, cb) => {
  const newState = state;
  newState.article.bannerimgurl = newValue;
  cb(newState);
};

const editIcon = (state, newValue, cb) => {
  const newState = state;
  newState.article.iconImgUrl = newValue;
  cb(newState);
};

const editTag = (state, newValue, cb) => {
  const newState = state;
  if (state.article.tags.includes(newValue)) {
    newState.article.tags = newState.article.tags.filter((el) =>
      el !== newValue ? el : null
    );
  } else {
    newState.article.tags.push(newValue);
  }
  cb(newState);
};
const postArticle = async (state, cb) => {
  if (window.confirm("Are you sure you want to post this article?")) {
    cb();
    disablePageScroll();
    const res = await GlobalActions.Requests.postArticle(state.article);
    enablePageScroll();
    return res;
  }
};

const updateArticle = async (state, cb) => {
  if (window.confirm("Are you sure you want to save this article?")) {
    disablePageScroll();
    cb({ sending: true });
    const res = await GlobalActions.Requests.updateArticle(state.article);
    cb(
      { sending: false },
      {
        severity: "success",
        open: true,
        message: "Update successful",
      }
    );
    enablePageScroll();
    return res;
  }
};

const publishArticle = async (state, cb) => {
  if (
    window.confirm(
      `Are you sure you want to ${
        state.article.published ? "un-" : ""
      }publish this article?`
    )
  ) {
    disablePageScroll();
    cb({ sending: true });
    state.article.published = !state.article.published;
    const res = await GlobalActions.Requests.publishArticle(state.article);
    cb(
      { sending: false },
      {
        severity: "success",
        open: true,
        message: `${
          state.article.published ? "Publish" : "Un-publish"
        } successful`,
      }
    );
    enablePageScroll();
    return res;
  }
};

export default {
  dropBlock,
  editBanner,
  editIcon,
  postArticle,
  updateArticle,
  publishArticle,
  editTag,
};
