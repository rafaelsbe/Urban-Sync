require('dotenv').config();

const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { handleMessage } = require('./flows/menu');

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: ['--no-sandbox']
  }
});

client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', async () => {
  console.log('✅ Bot conectado!');

  try {
    const number = "xxxxxxxxxxxx@c.us";
    await client.sendMessage(number, "Bot iniciado");
  } catch(err) {
    console.error('Erro ao enviar mensagem:', err)
  }
});

client.on('message', async msg => {
  await handleMessage(msg);
});

client.initialize();