const io = require("socket.io")(3000);
let clients = [];
io.on("connection", (socket) => {
  clients = [];
  socket.on("send-chat-message", (message) => {
    let client = clients.find((x) => x.id === socket.id);
    console.log(clients);
    socket.broadcast.emit("chat-message", `${client ? client.name + ":" : ""} ${message}`);
  });
  socket.on("new-user", (userName) => {
    clients.push({ id: socket.id, name: userName });
    console.log("User : ", userName);
    console.log(clients);
    socket.broadcast.emit("new-user", userName);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
    socket.broadcast.emit("left-user", clients.find((x) => x.id === socket.id).name);
  });
});
