export default (state, setState, data, setActionId, props) => {
  if (data) {
    setActionId(null);
    setState({ ...data, ...data.state, access: props.access });
  }
};
