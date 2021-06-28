export default (state, setState, data, props) =>
  data ? setState({ ...data, ...data.state, access: props.access }) : null;
