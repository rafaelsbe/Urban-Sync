// src/handlers/messageHandler.js
const messages = require('../templates/messages');
const leadService = require('../services/leadService');

module.exports = async (client, msg) => {
    const triggerText = 'Olá! Vim pelo site e gostaria de saber mais sobre!';

    console.log(`✉️ Mensagem recebida de [${msg.from}]: "${msg.body}"`);

    if (msg.body === triggerText) {
        try {
            // 1. Pegamos o objeto do chat diretamente da mensagem recebida
            const chat = await msg.getChat();

            console.log('🎯 Gatilho detectado! Iniciando digitação...');

            // Ativa o "Digitando..."
            await chat.sendStateTyping();
            
            // Simula o tempo de digitação (2 segundos)
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Salva o lead no Supabase
            await leadService.saveNewLead(msg.from);
            
            // 2. FORMA ULTRA SEGURA: Envia a mensagem direto no objeto do chat
            await chat.sendMessage(messages.welcomeMessage);

            // Alternativa caso queira que apareça como uma resposta direta à mensagem dele:
            // await msg.reply(messages.welcomeMessage);

            console.log('✅ Mensagem enviada com sucesso!');

        } catch (error) {
            console.error('❌ Erro ao processar fluxo de boas-vindas:', error);
        }
    }
};