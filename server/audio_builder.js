const fetch = require("node-fetch");
const fs = require("fs");

const specials = (champion) => {
  switch (champion) {
    case "Nunu & Willump":
      return "Nunu";
  }
  return champion;
};

const builder = async (gameVersion) => {
  const json = fs.readFileSync(
    `${__dirname}/../dragontail-${gameVersion}/${gameVersion}/data/en_US/champion.json`,
    "utf8"
  );
  const request = async (name) =>
    await fetch(
      `https://leagueoflegends.fandom.com/wiki/${specials(name)}/LoL/Audio`
    )
      .then((res) => res.text())
      .then((res) => ({
        pick: res
          .match(
            /(?<=https:\/\/static.wikia.nocookie.net\/leagueoflegends\/images\/)(.*)(?=.ogg)/g
          )[0]
          .split('" ')[0]
          .split(".ogg")[0],
        ban: res
          .match(
            /(?<=https:\/\/static.wikia.nocookie.net\/leagueoflegends\/images\/)(.*)(?=.ogg)/g
          )[1]
          .split('" ')[0]
          .split(".ogg")[0],
      }))
      .then((res) => ({
        name,
        pick: `https://static.wikia.nocookie.net/leagueoflegends/images/${res.pick}.ogg`,
        ban: `https://static.wikia.nocookie.net/leagueoflegends/images/${res.ban}.ogg`,
      }))
      .catch((e) => console.log("Error with " + champion));
  const audio = await Promise.all(
    Object.values(JSON.parse(json).data).map(async (el) => {
      return await request(el.name);
    })
  );
  const final = {};
  audio.map(
    (el) =>
      (final[el.name] = {
        pick: el.pick,
        ban: el.ban,
      })
  );
  fs.writeFile(
    `../dragontail-${gameVersion}/championaudio.json`,
    JSON.stringify(final),
    (err) => {
      if (err) throw err;
      console.log("Operation Successful");
    }
  );
};

builder("11.4.1");
