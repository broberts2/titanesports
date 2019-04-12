module.exports = (level, user_level, fn) => {
  if (user_level > level) {
    throw new Error("Invalid Permissions");
  } else {
    return fn;
  }
};
