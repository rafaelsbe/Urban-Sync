const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcodeTerminal = require('qrcode-terminal');
const qrcodeImage = require('qrcode')

const messageService = require('../handler/messageHandler.js');

const client = new Client({
    authStrategy: new LocalAuth({
        clientId: "client-one" //Define um ID fixo para o cliente da sessão
    }), // Mantém a sessão salva localmente
    puppeteer: {
        args: ['--no-sandbox'] // Evita problemas de permissão em servidores Linux/Docker
    }
});


const initWhatsappDashboard = (io) => {

    io.on('connection', (socket) => {
        console.log('Dashboard conectado via Socket:', socket.id);

        //Verifica se já está conectado no whatsapp e pula a fase de gerar o qrcode
        client.getState().then(state => {
            if (state === 'CONNECTED') {
                socket.emit('status', 'ready')
            };
        }).catch(() =>
            socket.emit('status', 'disconnected')
        );
    });
};


    // Evento para gerar o QR Code no terminal
    client.on('ready', ( )=> {
        qrcode.generate(qr, { small: true });
        console.log('Conctado ao WhatsApp.');
        io.emit('status' ,'connected');
    });

    // Evento caso o whatsaoo esteja desconectado
    client.on('disconnected', () => {
        console.log('WhatsApp desconectado');
        io.emit('status' ,'disconnected');
    });


    // Mudei para 'message_create' para capturar meus testes próprios também
    client.on('message_create', async msg => {

        try {
            // Passa o cliente e a mensagem recebida para o nosso Handler gerenciar
            await messageService(client, msg);
        } catch (error) {
            console.error('Erro dentro do messageService:', error);
        }
    });

console.log('🔄 Inicializando os módulos do sistema...');

// Inicializa o bot do WhatsApp
client.initialize();


// // Evento de confirmação de conexão
// client.on('ready', () => {
//     console.log('Chatbot conectado com sucesso e pronto para operar!');
// });


module.exports = {client, initWhatsappDashboard};