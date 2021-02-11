import Config from "../../config";

export default (socket, _this) =>
  socket.on("validateKey", (keyValid) => {
    if (keyValid) {
      _this.setState({ keyValid });
    }
  });
