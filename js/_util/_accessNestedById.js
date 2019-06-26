const _accessNestedById = (parentId, childID) => {
  let element = null;
  let elements = Array.prototype.slice.call(
    document.getElementById(parentId).getElementsByTagName("*")
  );
  elements.map(el => {
    if (el.id === childID) {
      element = el;
    }
  });
  return element;
};
