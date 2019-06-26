const _set_cookie = (name, value) => {
  const date = new Date();
  document.cookie = `${name}=${value}; expires=${date.getDate() + 1}; path=/`;
};
