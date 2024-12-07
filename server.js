const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Tambahkan rute untuk menangani permintaan ke "/"
app.get("/", (req, res) => {
    res.send("Welcome to the Realtime Chat Server");
});

io.on("connection", (socket) => {
    console.log("User connected");

    socket.on("chat message", (msg) => {
        console.log("Message: " + msg);
        io.emit("chat message", msg);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

// Railway menetapkan port di process.env.PORT
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})