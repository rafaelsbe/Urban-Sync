const { getSession } = require('../sessions/sessionManager');
const produtosFlow = require('./imoveis');
const atendenteFlow = require('./atendente');

async function handleMessage(msg) {
  const user = msg.from;
  const state = getSession(user);

  if (msg.body.toLowerCase() === 'oi' || state.step === 'start') {
    state.step = 'menu';

    return msg.reply(
      `👋 Olá! Escolha uma opção:

1 - Ver imoveis
2 - Falar com atendente`
    );
  }

  if (state.step === 'menu') {
    if (msg.body === '1') return produtosFlow(msg, state);
    if (msg.body === '2') return atendenteFlow(msg, state);
  }
}

module.exports = { handleMessage };