const apiService = require('../services/apiService');

module.exports = async (msg, state) => {
  state.step = 'imoveis';
    
  const imoveis = await apiService.getImoveis();

  let resposta = '📦 Imovéis disponíveis:\n\n';

  imoveis.forEach(i => {
    resposta += `• ${i.nome} - R$${i.preco}\n`;
  });

  return msg.reply(resposta);
};