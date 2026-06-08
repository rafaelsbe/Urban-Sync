// src/handlers/messageHandler.js
const messages = require('../templates/messages');
// const leadService = require('../services/leadService');
const { resolve } = require('path');

module.exports = async (client, msg) => {
    const triggerText = 'Olá! Vim pelo site e gostaria de saber mais sobre!';

    if (msg.body === triggerText) {
        try {
          const chat = await msg.getChat();

          await chat.sendStateTyping();
          await new Promise(resolve => setTimeout, 2000);

          // // Salva o lead no banco de dados de forma assíncrona
          // await leadService.saveNewLead(msg.from);
          
          await client.sendMessage(msg.from, messages.welcomeMessage);

        } catch {
          console.error('Erro ao processar mensagem:', err);
          await client.sendMessage(msg.from, messages.welcomeMessage);
        }
    }
};