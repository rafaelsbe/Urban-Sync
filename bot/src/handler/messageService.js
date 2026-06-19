// src/handlers/messageHandler.js
const messages = require('../templates/messages');
const leadService = require('../services/leadService');

const { resolve } = require('path');

module.exports = async (client, msg) => {
    const triggerText = 'Olá! Vim pelo site e gostaria de saber mais sobre!';


  // Console log para você ver no terminal exatamente o que o bot está recebendo
    console.log(`Mensagem recebida de [${msg.from}]: "${msg.body}"`);

    if (msg.body === triggerText) {
        try {
          const chat = await msg.getChat();

          console.log('Recebendo gatilho...')

          await chat.sendStateTyping();
          await new Promise(resolve => setTimeout, 2000);

          // // Salva o lead no banco de dados de forma assíncrona
          await leadService.saveNewLead(msg.from);
          
          await client.sendMessage(msg.from, messages.welcomeMessage);

          console.log('Mensagem enviada!')

        } catch {
          console.error('Erro ao processar mensagem:', err);
          await client.sendMessage(msg.from, messages.welcomeMessage);
        }
    }
};