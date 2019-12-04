const fs = require("fs");
const config = require("../config");
const Users = require("../models/user");
const ObjectId = require("mongodb").ObjectID;
const bcrypt = require("bcrypt");
const uid = require("rand-token").uid;
const nodemailer = require("nodemailer");

const sendEmail = async (recipient, subject, html) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: config.titanEmail,
      pass: config.titanPassword
    }
  });
  const mailOptions = {
    from: config.titanEmail,
    to: recipient,
    subject,
    html
  };
  return await new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        reject({
          code: 11102,
          msg: "An Error Occurred."
        });
      }
      resolve({
        code: 200,
        msg: `Password reset instructions sent to ${recipient}.`
      });
    });
  });
};

module.exports = {
  getIconsList: async req => {
    const fileList = await new Promise((resolve, reject) => {
      fs.readdir(
        __dirname +
          `/../../dragontail-${config.currentVersion}/${config.currentVersion}/img/profileicon`,
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
      fs.readdir(__dirname + `/../../profile_videos`, (err, files) => {
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
  },
  compareResetKey: async req => {
    const user = await Users.findOne({ reset_code: req.query.key });
    if (user) {
      try {
        await Users.update(
          { reset_code: req.query.key },
          {
            password: bcrypt.hashSync(req.body.password, 10),
            $unset: {
              reset_code: ""
            }
          }
        );
        return {
          code: 200,
          msg: "Password Successfully Updated!"
        };
      } catch (e) {
        console.log(e);
        return {
          code: 509,
          msg: "Unable to update password."
        };
      }
    } else {
      return {
        code: 512,
        msg: "Invalid Key."
      };
    }
  },
  emailResetKey: async req => {
    const e = `${req.query.email}`;
    const email = new RegExp(e, "i");
    const user = await Users.findOne({ email });
    if (!user) {
      return {
        code: 11102,
        msg: "Could not find user with the email provided."
      };
    }
    try {
      const reset_code = uid(64);
      const status = await sendEmail(
        req.query.email,
        "Password Reset Instructions",
        `<div><h1>Please follow the link below to reset your password:</h1><div><a href=${`${
          config.production
            ? "https://titan-esports.org/reset_password"
            : "http://localhost:3000/reset_password"
        }?u=${user.username}&key=${reset_code}`}>${
          config.production
            ? "https://titan-esports.org/reset_password"
            : "http://localhost:3000/reset_password"
        }?u=${
          user.username
        }&key=${reset_code}</a></div><h2 style="margin-top: 25px">Note: Token will expire after 5 min.</h2></div>`
      );
      await Users.update(
        { email: req.query.email },
        {
          reset_code
        }
      );
      setTimeout(async () => {
        const userData = Users.find({ reset_code });
        if (userData) {
          await Users.update(
            { email: req.query.email },
            {
              $unset: {
                reset_code: ""
              }
            }
          );
        }
      }, 300000);
      return status;
    } catch (e) {
      console.log(e);
      return { code: 11102, msg: "Get User Error." };
    }
  }
};
