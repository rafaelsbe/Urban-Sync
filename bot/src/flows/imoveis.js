import { buildings } from "@/lib/data"
const apiService = require('../services/apiService');

module.exports = async (msg, state, params) => {
  state.step = 'imoveis';
  
  const buildings = buildings.find((item) => item.slug === params.slug)
  const imoveis = await apiService.getImoveis();

  let resposta = '📦 Imovéis disponíveis:\n\n';

  imoveis.forEach(i => {
    resposta += `• ${buildings.name} - R$${buildings.price}\n`;
  });

  return msg.reply(resposta);
};