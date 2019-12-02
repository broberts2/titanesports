const SlayersGuild = require("../models/slayers_guild");
const config = require("../config");
const fetch = require("node-fetch");

module.exports = {
  updateSlayersGuild: async (req, level, exact) => {
    const titan_esports_playlist_id = "PL-i5-pb_Ehx-LGVh3uCUFSFZtIv5QfSCx";
    if (
      (exact && req.user_info.level !== 0 && level !== req.user_info.level) ||
      req.user_info.level > level
    ) {
      return {
        msg: "Access Denied",
        code: 403
      };
    }
    let videos = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?key=${config.youtubeApiKey}&playlistId=${titan_esports_playlist_id}&part=snippet,id&maxResults=50`
    ).then(res => res.json());
    console.log(videos);
    videos = videos.items.map(el => ({
      publishedAt: el.snippet.publishedAt,
      kind: el.kind,
      etag: el.etag,
      id: el.id,
      title: el.snippet.title,
      description: el.snippet.description,
      thumbnail: el.snippet.thumbnails.maxres,
      src: `https://www.youtube.com/embed/${el.snippet.resourceId.videoId}`
    }));
    await SlayersGuild.update(
      { title: "slayersguild" },
      {
        videos
      }
    );
    return {
      code: 200,
      msg: "Update Success!"
    };
  },
  getSlayersGuild: async req => {
    try {
      const videos = await SlayersGuild.findOne({
        title: "slayersguild"
      });
      return {
        videos: videos.videos,
        code: 200,
        msg: "Success!"
      };
    } catch (e) {
      return {
        videos: [],
        code: 500,
        msg: "An error occurred."
      };
    }
  }
};
