const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // Sesuaikan jika klien memiliki domain spesifik
        methods: ["GET", "POST"]
    }
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

// Gunakan PORT dari environment variable
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
