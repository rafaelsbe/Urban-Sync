const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { initWhatsappDashboard } = require('./config/whatsapp'); // Caminho do seu arquivo acima

const app = express();
const server = http.createServer(app);

const io = new Server(server, { 
    cors: { origin: "*" } 
});

// Inicializa o WhatsApp passando a instância do Socket.io
initWhatsappDashboard(io);

server.listen(3000, () => 
    console.log('Servidor rodando na porta 3000'));