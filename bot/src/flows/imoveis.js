const apiService = require('../services/apiService');
import { buildings } from "@/lib/data"

// module.exports = async (msg, state, params) => {
//   state.step = 'imoveis';

//   const building = buildings.find((item) => item.slug === params.slug)

//   if (!building) {
//     notFound()
//   }

//   // const buildings = buildings.find((item) => item.slug === params.slug)
//   const imoveis = await apiService.getImoveis();

//   let resposta = '📦 Imovéis disponíveis:\n\n';

//   imoveis.forEach(building => {
//     resposta += `• ${building.title} - R$${building.price}\n
//                  •${building.purpose} - ${building.description}`;
//   });

//   return msg.reply(resposta);
// };


async function imoveisFlow(client, msg, state) {
    // 1. Filtra ou simplesmente pega os primeiros imóveis do mock
    const imoveisParaMostrar = buildings.slice(0, 3); 

    await safeSend(client, msg.from, "🏢 Aqui estão alguns imóveis que encontrei para você:");

    for (const imovel of imoveisParaMostrar) {
        const mensagem = `
🏠 *${imovel.title}*
📍 Localização: ${imovel.city}
💰 Valor: R$ ${imovel.price}

🔗 *Veja mais detalhes no site:*
https://urban-sync.com/empresa/${imovel.slug}
        `;
        
        await safeSend(client, msg.from, mensagem);
    }

    // 3. Atualiza o estado para o usuário saber o que fazer em seguida
    state.step = 'detalhes_imovel'; 
    await safeSend(client, msg.from, "\nDigite o *nome* de um imóvel para saber mais ou *voltar* para o menu principal.");
}

module.exports = imoveisFlow;