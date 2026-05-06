const { getSession } = require('../sessions/sessionManager');
const produtosFlow = require('./imoveis');
const atendenteFlow = require('./atendente');
const { safeSend } = require('../utils/helpers');
const { Message } = require('genkit');

async function handleMessage(Client, msg, companyId) {
  const user = msg.from;
  const text = msg.textoParaEnviar

  await saveLeadInteraction({
    companyId: companyId, 
    user: user, 
    message: text,
    name: msg.pushname
  })
  const state = getSession(user);

  // Caso o usúario entre em contato direto no WhatsApp ou com o link de redirecionamento
  if (msg.body.toLowerCase() === 'oi' || state.step === 'start') {
    state.step = 'menu';
    textoParaEnviar = `👋 Olá! Sou o assistente da ${companyId}.\n\nEscolha uma opção:\n1 - Ver imoveis\n2 - Falar com atendente`;

    return safeSend(client, user, textoParaEnviar);
  }

  // Em vez de msg.reply, usamos o safeSend
  return safeSend(Client, user, textoParaEnviar)

  if (state.step === 'menu') {
    if (msg.body === '1' || msg.body === 'imoveis') return produtosFlow(Client, msg, state);
    if (msg.body === '2' || msg.body === 'atendente') return atendenteFlow(Client, msg, state);

    // Caso ele digite algo fora do menu
    return safeSend(client, user, "Ops! Não entendi. Digite 1 para Imóveis ou 2 para Atendente.");
  }
}

module.exports = { handleMessage };