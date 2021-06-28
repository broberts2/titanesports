export default async (state, setState, wait, props, replay) => {
  setState((lastState) => ({ ...lastState, transition: "out" }));
  await wait(750);
  props._(true);
  await wait(1250);
  setState((lastState) => ({
    ...lastState,
    transition: "in",
    draftUI: true,
    readycheck: false,
    replay,
  }));
  await wait(1500);
  props._();
};
