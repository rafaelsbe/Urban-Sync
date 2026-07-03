// src/templates/messages.js

module.exports = {
    welcomeMessage: `👋 Seja muito bem-vindo(a)!\n\n` +
                    `Ficamos muito felizes com o seu contato. Para acelerar o seu atendimento, ` +
                    `por favor, me informe o seu *nome completo*:`,

    askServiceMessage: (nome) => `Prazer, ${nome}! 🤝\n\n` +
                                 `Qual *serviço* você está buscando hoje?\n` +
                                 `*(Ex: Compra de Imóvel, Aluguel, Avaliação, Construção)*`,
                    
    endMessage: `👍 Perfeito! Já anotei todos os seus dados aqui no sistema.\n\n` +
                `Nossa equipe já foi notificada e um de nossos atendentes dará continuidade em instantes. Obrigado!`
};