import config from "config";

const _ = config.production
  ? config.productionEndpoint
  : config.developementEndpoint;

export default {
  discord: "https://discord.gg/uZ8Q7ncrV4",
  twitch: "https://www.twitch.tv/titanesportz",
  twitter: "https://twitter.com/titanesportz",
  reddit: "https://www.reddit.com/user/TES_League/",
  youtube: "https://www.youtube.com/channel/UCo5klVtSLp2YLch8ye_FBRw",
  facebook: "https://www.facebook.com/titanesportz/",
  images: {
    hdcircle: `${_}/static/images/hdcircle.png`,
    divinity: `${_}/static/images/divinity.png`,
    toplane: `${_}/static/images/toplane.png`,
    jungle: `${_}/static/images/jungle.png`,
    midlane: `${_}/static/images/midlane.png`,
    botlane: `${_}/static/images/botlane.png`,
    support: `${_}/static/images/support.png`,
    divinitylogo: `${_}/static/images/divinitylogo.png`,
    conqueror: `${_}/static/images/conqueror.png`,
    conquerorlogo: `${_}/static/images/conquerorlogo.png`,
    logo: `${_}/static/images/logo.png`,
    lol: `${_}/static/images/lol.png`,
    valorant: `${_}/static/images/valorant.png`,
    worldofwarcraft: `${_}/static/images/worldofwarcraft.png`,
    valheim: `${_}/static/images/valheim.png`,
    aery: `${_}/static/images/aery.png`,
    electrocute: `${_}/static/images/electrocute.png`,
    comet: `${_}/static/images/comet.png`,
    fleetfootwork: `${_}/static/images/fleetfootwork.png`,
    sorcery: `${_}/static/images/sorcery.png`,
    unsealedspellbook: `${_}/static/images/unsealedspellbook.png`,
    yasuo: `${_}/static/images/yasuo.png`,
    zed: `${_}/static/images/zed.png`,
    azir: `${_}/static/images/azir.png`,
    jinx: `${_}/static/images/jinx.png`,
    zoe: `${_}/static/images/zoe.png`,
    gold: `${_}/static/images/gold.png`,
    diamond: `${_}/static/images/diamond.png`,
    firedrake: `${_}/static/images/firedrake.png`,
    oceandrake: `${_}/static/images/oceandrake.png`,
    poro: `${_}/static/images/poro.png`,
    scroll: `${_}/static/images/scroll.png`,
    poppy: `${_}/static/images/poppy.png`,
    twitter: `${_}/static/images/twitter.png`,
    discord: `${_}/static/images/discord.png`,
    zilean: `${_}/static/images/zilean.png`,
    leagueoflegends: `${_}/static/images/leagueoflegends.png`,
    water: `${_}/static/images/water.png`,
    fire: `${_}/static/images/fire.png`,
    tags: {
      all: `${_}/static/images/graspoftheundying.png`,
      pinned: `${_}/static/images/presstheattack.png`,
      rankings: `${_}/static/images/electrocute.png`,
    },
  },
  backgrounds: {
    violet: `${_}/static/backgrounds/violet.png`,
    otter: `${_}/static/backgrounds/otter.jpg`,
    kindred: `${_}/static/backgrounds/kindred.png`,
    baron: `${_}/static/backgrounds/baron.jpg`,
  },
  dragontail: {
    champions: {
      splash: (champion) =>
        `${_}/dragontail/img/champion/splash/${champion}_0.jpg`,
      tile: (champion) =>
        `${_}/dragontail/img/champion/tiles/${champion}_0.jpg`,
    },
  },
  backgroundvideos: {
    background1: `${_}/static/backgroundvideos/background1.mp4`,
    background2: `${_}/static/backgroundvideos/background2.mp4`,
    background3: `${_}/static/backgroundvideos/background3.mp4`,
    background4: `${_}/static/backgroundvideos/background4.mp4`,
  },
};
