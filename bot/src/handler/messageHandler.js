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
            // 2. Pegamos o lead do Supabase para verificar se já existe e verificar seu stado atual no bot
            const getLead = await leadService.getNewLead(msg.from);


            // Se o lead já existe e está sob cuidados humanos (em atendimento / concluído), o bot não interfere
            if (getLead && (getLead.status === 'em atendimento' || getLead.current_step !== 'concluido')) {
                return;
            }

            //Fluxo 1: Recebe a mensagem de gatilho
            if (msg.body === triggerText) {
                console.log('🎯 Gatilho detectado! Iniciando digitação...');

                // Ativa o "Digitando..."
                await chat.sendStateTyping();

                // Salva o lead no Supabase
                await leadService.saveNewLead(msg.from);

                // Simula o tempo de digitação (2 segundos)
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // 2. FORMA ULTRA SEGURA: Envia a mensagem direto no objeto do chat
                await chat.sendMessage(messages.welcomeMessage);

                return;
            }
            
            // Se o lead não existe, não faz nada (o fluxo de boas-vindas só é disparado pelo gatilho)
            if (!getLead) {
                return;
            }

            //Fluxo 2: Guarda o nome do cliente
            if (getLead.current_step === 'aguardando_nome') {

                // Atualiza o nome do lead no Supabase
                await leadService.updateLead(msg.from, { 
                    name: msg.body, 
                    current_step: 'aguardando_servico' 
                });

                await new Promise(resolve => setTimeout(resolve, 2000));

                // Envia a mensagem de solicitação de serviço diretamente no objeto do chat já com o nome do cliente
                await chat.sendMessage(messages.askServiceMessage(msg.body));
                return;
            }

            //Fluxo 3: Guarda o serviço do cliente
            if (getLead.current_step === 'aguardando_servico') {
                await chat.sendStateTyping();
                const serviceSeach = msg.body;

                // Atualiza o serviço do lead no Supabase e marca como concluído
                await leadService.updateLead(msg.from, { 
                    service: serviceSeach, 
                    current_step: 'concluido', 
                    status: 'em atendimento' 
                });

                await new Promise(resolve => setTimeout(resolve, 2000));

                // Envia a mensagem de conclusão diretamente no objeto do chat
                await chat.sendMessage(messages.endMessage);
                return;
            }

            console.log('✅ Mensagem enviada com sucesso!');

        } catch (error) {
            console.error('❌ Erro ao processar fluxo de boas-vindas:', error);
        }
    }
};