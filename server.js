const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Membuat aplikasi express
const app = express();
const server = http.createServer(app);
const io = socketIo(server); // Menghubungkan socket.io ke server

// Melayani file statis
app.use(express.static('public'));

// Endpoint utama untuk mengirimkan file HTML
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Event ketika pengguna terhubung ke server
io.on('connection', (socket) => {
    console.log('A user connected');
    
    // Mendengarkan event chat message
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg); // Meneruskan pesan ke semua pengguna
    });
    
    // Event ketika pengguna terputus
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Menjalankan server di port 3000
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
