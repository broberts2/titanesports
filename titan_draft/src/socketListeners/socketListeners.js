import broadcast from "./events/broadcast";
import getDraft from "./events/getDraft";
import validateKey from "./events/validateKey";

const EVENTS = [getDraft, broadcast, validateKey];

export default (socket, _this) => EVENTS.map((fn) => fn(socket, _this));
