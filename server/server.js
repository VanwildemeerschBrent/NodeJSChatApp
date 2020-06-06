const io = require("socket.io")(3000);
let clients = [];
io.on("connection", (socket) => {
  socket.on("send-chat-message", (message) => {
    socket.broadcast.emit("chat-message", `${clients.find((x) => x.id === socket.id).name}: ${message}`);
  });
  socket.on("new-user", (userName) => {
    clients.push({ id: socket.id, name: userName });
    console.log("User : ", userName);
    socket.broadcast.emit("new-user", userName);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
    socket.broadcast.emit("left-user", clients.find((x) => x.id === socket.id).name);
  });
});
