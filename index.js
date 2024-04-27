const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`socket connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    console.log(data);
    socket.to(data.room).emit("receive_message", { ...data, from: socket.id });
  });

  socket.on("send-audio", (audioData) => {
    // Aquí puedes procesar y almacenar el audio según tus necesidades
    // Luego, emite el audio a todos los clientes conectados (retransmisión)
    socket.to(data.room).emit("receive-audio", audioData);
  });

  //   socket.on("send_message", (data) => { => everyone
  //     console.log(data);
  //     socket.broadcast.emit("receive_message", data);
  //   });
});
server.listen(3001, () => {
  console.log("server running");
});
