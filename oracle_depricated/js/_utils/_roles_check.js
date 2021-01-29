module.exports = (ar1, ar2) => {
  for (let i = 0; i < ar1.length; i++) {
    for (let j = 0; j < ar2.length; j++) {
      if (ar1[i] === ar2[j]) return ar1[i];
    }
  }
  return false;
};
