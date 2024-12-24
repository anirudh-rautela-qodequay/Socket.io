import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";

const port = 8080;

const app = express();
const server = createServer(app);

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST"],
//     credentials: true,
//   })
// );

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,  // cookie,headers
  },
});

io.on("connection", (socket) => {
  console.log("User Connected");
  console.log("Id", socket.id);
  // socket.emit("welcome",`Welcome to the server ${socket.id}`)
  // socket.broadcast.emit("welcome",`Welcome to the server ${socket.id}`)

  // socket.on("message",(data)=>{
  //   console.log(data)
  //   // io.emit("reveive-message",data)
  //   socket.broadcast.emit("reveive-message",data)
  // })

  socket.on("message",({room,message})=>{
    console.log({room,message})
    io.to(room).emit("reveive-message",message)
  })

  socket.on("disconnect",()=>{
    console.log("User Disconnected",socket.id)
  })
});

app.get("/", (req, res) => {
  res.send("SERVER IS LIVE");
});

server.listen(port, () => {
  console.log(`Server is running on  http://localhost:${port}`);
});
