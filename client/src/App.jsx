// import './App.css'
import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import { Container, Typography, TextField, Button } from "@mui/material";

function App() {
  // const socket = io("http://localhost:8080");
  const socket = useMemo(()=> io("http://localhost:8080"), []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // socket.emit("message",message)
    socket.emit("message",{message,room})
    setMessage("")
  };

  const [message, setMessage] = useState("")
  const [room, setRoom] = useState("")
  const [socketId, setSocketId] = useState("")

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected: ", socket.id);
      setSocketId(socket.id)
    });
    socket.on("welcome", (s) => {
      console.log(s);
    });

    socket.on("reveive-message",(data)=>{
      console.log("Data: ",data)
    })

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Container maxWidth="sm">
      <Typography variant="h3" component="div" gutterBottom>
        Welcome to Socket.io
      </Typography>
      <Typography variant="h5" component="div" gutterBottom>
        {socketId}
      </Typography>
      <form onSubmit={handleSubmit}>
        < TextField
          value={room}
          onChange={(e)=>setRoom(e.target.value)}
          id="outlined-basic"
          label="Enter Room"
          variant="outlined"
        />
        < TextField
          value={message}
          onChange={(e)=>setMessage(e.target.value)}
          id="outlined-basic"
          label="Enter your message"
          variant="outlined"
        />
        <Button type="submit" variant="contained">Send</Button>
      </form>
    </Container>
  );
}

export default App;
