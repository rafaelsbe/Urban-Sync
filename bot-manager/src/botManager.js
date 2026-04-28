const { Client, LocalAuth } = require('whatsapp-web.js');

const bots = {};

function createBot(companyId) {
  const client = new Client({
    authStrategy: new LocalAuth({
      clientId: companyId
    }),
    puppeteer: {
      headless: true,
      args: ['--no-sandbox']
    }
  });

  client.initialize();

  bots[companyId] = {
    client,
    status: 'iniciando'
  };

  client.on('ready', () => {
    bots[companyId].status = 'conectado';
    console.log(`✅ Bot ${companyId} conectado`);
  });

  client.on('qr', (qr) => {
    bots[companyId].qr = qr;
  });

  return bots[companyId];
}

function getBots() {
  return bots;
}

module.exports = { createBot, getBots };