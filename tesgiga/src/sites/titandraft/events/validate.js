export default (state, setState, data) =>
  setState({
    transition: "in",
    draft: data.draft,
    access: data.access,
    baddraft: data.access === "noexist",
    draftUI:
      data.draft &&
      data.draft.primed &&
      !data.draft.finisheddate &&
      data.access !== "noexist",
    readycheck:
      data.draft &&
      !data.draft.primed &&
      !data.draft.finisheddate &&
      data.access !== "noexist",
    lobby: data.draft && data.draft.finisheddate && data.access !== "noexist",
  });
