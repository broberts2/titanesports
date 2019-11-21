const fs = require("fs");
const config = require("../config");

module.exports = {
  getIconsList: async req => {
    const fileList = await new Promise((resolve, reject) => {
      fs.readdir(
        __dirname +
          `/../dragontail-${config.currentVersion}/${config.currentVersion}/img/profileicon`,
        (err, files) => {
          const index = parseInt(req.query.index);
          const size = parseInt(req.query.size);
          const max = index + size;
          const totalCount = files.length;
          if (err) {
            reject(err);
          } else {
            files = files
              .map((el, i) => (i >= index && i < max ? el : null))
              .filter(el => el);
            resolve({ files, totalCount });
          }
        }
      );
    });
    return {
      totalCount: fileList.totalCount,
      fileList: fileList.files,
      code: 200,
      msg: "Icon Fetch Successful!"
    };
  },
  getProfileVideos: async req => {
    const fileList = await new Promise((resolve, reject) => {
      fs.readdir(__dirname + `/profile_videos`, (err, files) => {
        if (err) {
          reject(err);
        } else {
          resolve(files);
        }
      });
    });
    return {
      fileList,
      code: 200,
      msg: "Profile Video Fetch Successful!"
    };
  }
};
