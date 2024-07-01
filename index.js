const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
app.use(express.static(path.resolve("./public")));
const io = new Server(server);

// Socket Requests
io.on("connection", (client) => {
  console.log("A New User Has Crearted ", client.id);
  // client.on("disconnect", () => {
  //   console.log("user disconnected");
  // });
  client.on("user-message", (message) => {
    console.log("Message:-> ", message);
    io.emit("message", message);
  });
});

app.get("/", (req, res) => {
  return res.sendFile("./public/index.html");
});

server.listen(5001, () => {
  console.log("Server Running at the port 5001");
});
