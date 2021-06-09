const dropBlock = (state, i, cb) => {
  if (window.confirm("Are you sure you want to delete this block?")) {
    const newState = state;
    const contentblocks = {};
    delete newState.article.contentblocks[i];
    Object.values(newState.article.contentblocks).map((block, i) => {
      block.n = i;
      contentblocks[i] = block;
    });
    newState.article.contentblocks = contentblocks;
    cb(newState);
  }
};

export default {
  dropBlock,
};
