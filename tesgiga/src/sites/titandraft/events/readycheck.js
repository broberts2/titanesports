export default (state, setState, draft) => {
  setState((lastState) => ({ ...lastState, draft }));
};
