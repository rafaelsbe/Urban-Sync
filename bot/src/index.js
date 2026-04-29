require('dotenv').config();

const { safeSend } = require('./utils/helpers');

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

client.on('ready', async (msg) => {
  console.log('✅ Bot conectado!');

  try {
    const number = process.env.TEST_NUMBER;
    // await client.sendMessage(number, "Bot iniciado");
    await safeSend(client, number, "Bot iniciado");
  } catch (err) {
    console.error('Erro ao enviar mensagem:', err)
  }
});

client.on('message', async (msg) => {
  const TEST_MODE = process.env.TEST_MODE === 'true';
  const TEST_NUMBER = process.env.TEST_NUMBER;

  // 🚫 bloqueia mensagens de outros usuários
  if (TEST_MODE && msg.from !== TEST_NUMBER) {
    console.log('🚫 Ignorando usuário fora do teste:', msg.from);
    return;
  }
  await handleMessage(msg);
});

client.initialize();