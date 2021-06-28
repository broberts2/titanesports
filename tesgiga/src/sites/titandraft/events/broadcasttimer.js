export default (state, setState, timer) => {
  setState((lastState) => ({ ...lastState, timer }));
};
