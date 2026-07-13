// src/handlers/messageHandler.js
const messages = require('../templates/messages');
const leadService = require('../services/leadService');

module.exports = async (client, msg, companyId) => {
    // ⚠️ TRAVA 1: Se a mensagem foi enviada pelo próprio bot, ignora na hora!
    if (msg.fromMe) return;

    const triggerText = 'Olá! Vim pelo site e gostaria de saber mais sobre!';

    console.log(`✉️ [Empresa: ${companyId}] Mensagem de [${msg.from}]: "${msg.body}"`);

    try {
        const chat = await msg.getChat();
        
        // Buscamos o lead passando o ID da mensagem recebida
        const getLead = await leadService.getNewLead(msg.from, companyId);

        // Se o lead já existe e está sob cuidados humanos (em atendimento), o bot não interfere
        if (getLead && getLead.status === 'em atendimento') {
            return;
        }

        // Fluxo 1: Recebe a mensagem de gatilho (Início do Bot)
        if (msg.body === triggerText) {
            console.log(`🎯 Gatilho detectado para empresa [${companyId}]! Iniciando digitação...`);

            await chat.sendStateTyping();

            // Salva o novo lead atrelando-o à empresa atual
            await leadService.saveNewLead(msg.from, companyId);

            await new Promise(resolve => setTimeout(resolve, 2000));
            
            await chat.sendMessage(messages.welcomeMessage);
            return;
        }
        
        // Se a mensagem não é o gatilho E o lead ainda não existe no banco, ignora
        if (!getLead) {
            return;
        }


        // Fluxo 2: Guarda o nome do cliente
        if (getLead.current_step === 'aguardando_nome') {
            console.log(`👤 Nome recebido: "${msg.body}". Atualizando banco...`);
            await chat.sendStateTyping();

            await leadService.updateLead(msg.from, companyId, { 
                name: msg.body, 
                current_step: 'aguardando_servico' 
            });

            await new Promise(resolve => setTimeout(resolve, 2000));

            await chat.sendMessage(messages.askServiceMessage(msg.body));
            return;
        }


        // Fluxo 3: Guarda o serviço do cliente
        if (getLead.current_step === 'aguardando_servico') {
            console.log(`💼 Serviço recebido: "${msg.body}". Finalizando automação...`);
            await chat.sendStateTyping();
            const serviceSearch = msg.body;

            await leadService.updateLead(msg.from, companyId, { 
                service: serviceSearch, 
                current_step: 'concluido', 
                status: 'em atendimento' 
            });

            await new Promise(resolve => setTimeout(resolve, 2000));

            await chat.sendMessage(messages.endMessage);
            console.log(`✅ Fluxo concluído com sucesso para a empresa [${companyId}]!`);
            return;
        }

    } catch (error) {
        console.error(`❌ Erro ao processar fluxo de boas-vindas da empresa [${companyId}]:`, error);
    }
};