const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { client, initWhatsappDashboard } = require('./config/whatsapp'); // Caminho do seu arquivo acima

console.log('🔄 Inicializando os módulos do sistema...');

const app = express();
const server = http.createServer(app);

const io = new Server(server, { 
    cors: { origin: "*" } 
});

// Inicializa o WhatsApp passando a instância do Socket.io
// client.initialize();
initWhatsappDashboard(io);

server.listen(3000, () => console.log('Servidor Multi-Tenant rodando na porta http://localhost:3000'));