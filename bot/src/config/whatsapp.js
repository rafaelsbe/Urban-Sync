// src/config/whatsapp.js
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const messageService = require('../handler/messageService');

const client = new Client({
    authStrategy: new LocalAuth(), // Mantém a sessão salva localmente
    puppeteer: {
        args: ['--no-sandbox'] // Evita problemas de permissão em servidores Linux/Docker
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

// Evento disparado a cada nova mensagem recebida
client.on('message', async msg => {
    // Passa o cliente e a mensagem recebida para o nosso Handler gerenciar
    await messageService(client, msg);
});

module.exports = client;































// require('dotenv').config();

// const { Client, LocalAuth } = require('whatsapp-web.js');
// const qrcode = require('qrcode-terminal');

// const client = new Client({
//   authStrategy: new LocalAuth(),
//   puppeteer: {
//     headless: true,
//     args: ['--no-sandbox']
//   }
// });

// client.on('qr', qr => {
//   qrcode.generate(qr, { small: true });
// });

// client.on('ready', async () => {
//   console.log('✅ Bot conectado!');

// //   try {
// //     const number = process.env.TEST_NUMBER;
// //     // await client.sendMessage(number, "Bot iniciado");
// //     await safeSend(client, number, "Bot iniciado");
// //   } catch (err) {
// //     console.error('Erro ao enviar mensagem:', err)
// //   }
// });

// client.on('message', async msg => {
//   // const TEST_MODE = process.env.TEST_MODE === 'true';
//   // const TEST_NUMBER = process.env.TEST_NUMBER;

//   // 🚫 bloqueia mensagens de outros usuários
//   // if (TEST_MODE && msg.from !== TEST_NUMBER) {
//   //   console.log('🚫 Ignorando usuário fora do teste:', msg.from);
//   //   return;
//   // }
//   const initialMessage = msg.sendMessage();

//   //Verifica se a mensagem foi recebida após clicar no botão
//   if (msg.body === initialMessage) {
//     const chat = await msg.getChat();
//     await client.sendMessage(msg.from, 'Bem-vindo à nossa empresa! 🚀\n\nSou o assistente virtual. Como posso te ajudar hoje?')

//     //Marca a mensagem como "Lida"
//     await chat.sendSeen();
//   }
//   try {
//     await handleMessage(client, msg);
//   } catch {
//     console.error('Erro ao processar mensagem:', err);
//   }
// });

// client.initialize();