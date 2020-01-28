export default (state = {}, action) => {
  switch (action.type) {
    case "startRequest":
      return {
        ...state,
        request: action.request
      };

    default:
      return state;
  }
};
