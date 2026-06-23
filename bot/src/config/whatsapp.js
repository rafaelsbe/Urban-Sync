const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const messageService = require('../handler/messageService');

const client = new Client({
    authStrategy: new LocalAuth({
        clientId: "client-one" 
    }), 
    puppeteer: {
        args: ['--no-sandbox'] 
    }
});

// Evento para gerar o QR Code no terminal
client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
    console.log('Escaneie o QR Code acima para conectar o WhatsApp.');
});

// Evento de confirmação de conexão
client.on('ready', () => {
    console.log('Chatbot conectado com sucesso e pronto para operar!');
});

// Mudei para 'message_create' para capturar meus testes próprios também
client.on('message_create', async msg => {
    // LOG DE TESTE: Se isso aparecer no terminal, o gatilho está funcionando!
    console.log(`[GATILHO] Mensagem recebida de ${msg.from}: "${msg.body}"`);
    
    try {
        // Passa o cliente e a mensagem recebida para o nosso Handler gerenciar
        await messageService(client, msg);
    } catch (error) {
        console.error('Erro dentro do messageService:', error);
    }
});

// // ADICIONADO: Inicializa o cliente para o Puppeteer rodar
// client.initialize();

module.exports = client;