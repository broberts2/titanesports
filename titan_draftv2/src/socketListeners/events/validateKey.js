import Config from "../../config";
import tooling from "../../__tooling__";

export default (socket, _this) =>
  socket.on("validateKey", (keyValid) => {
    if (keyValid) {
      _this.setState({ keyValid });
    }
  });
