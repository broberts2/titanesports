const Badge = require("../models/Badge");

const _ri = rarity => {
  switch(rarity) {
    case "legendary":
      return 0;
    case "epic":
      return 1;
    case "rare":
      return 2;
    case "uncommon":
      return 3;
    case "common":
      return 4;
  }
}

const _sortBadges = arr => arr.sort((a, b) => a.name < b.name ? -1 : 1).sort((a, b) => _ri(a.rarity) < _ri(b.rarity) ? -1 : 1)

module.exports = {
  post: async (req) => {
    return await Badge.create(req.body);
  },
  getBadgeById: async (req) => await Badge.findOne({_id: req.query.id}),
  getBadgeBatchById: async (req) => {
    const badges = await Badge.find({"_id" : {"$in" : req.body.ids}})
    return _sortBadges(badges);
  }
};