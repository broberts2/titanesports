const _read_cookie = () => {
  const array = document.cookie.split("=");
  let obj = {};
  for (let i = 0; i < array.length; i = i + 2) {
    obj[array[i]] = array[i + 1];
  }
  return obj;
};
