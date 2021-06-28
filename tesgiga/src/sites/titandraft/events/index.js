import validate from "./validate";
import broadcasttransition from "./broadcasttransition";
import readycheck from "./readycheck";
import broadcast from "./broadcast";
import broadcasttimer from "./broadcasttimer";
import sendchampiondata from "./sendchampiondata";
import sendchampiondatasingle from "./sendchampiondatasingle";
import sendnextaction from "./sendnextaction";
import whisper from "./whisper";

export default (state, setState) => ({
  validate: (data) => validate(state, setState, data),
  broadcasttransition: (wait, props, replay) =>
    broadcasttransition(state, setState, wait, props, replay),
  readycheck: (draft) => readycheck(state, setState, draft),
  broadcast: (data, setActionId, props) =>
    broadcast(state, setState, data, setActionId, props),
  broadcasttimer: (timer) => broadcasttimer(state, setState, timer),
  sendchampiondata: (ChampionData, setChampionData) =>
    sendchampiondata(state, setState, ChampionData, setChampionData),
  sendchampiondatasingle: (ChampionData, setSingleChampionData) =>
    sendchampiondatasingle(
      state,
      setState,
      ChampionData,
      setSingleChampionData
    ),
  sendnextaction: (action, setNextAction) =>
    sendnextaction(state, setState, action, setNextAction),
  whisper: (data, props) => whisper(state, setState, data, props),
});
