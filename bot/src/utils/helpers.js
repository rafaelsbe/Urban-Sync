require('dotenv').config();

const TEST_MODE = process.env.TEST_MODE === 'true';
const TEST_NUMBER = process.env.TEST_NUMBER;

async function safeSend(client, to, message) {
  if (TEST_MODE) {
    console.log('🧪 MODO TESTE ATIVO');
    return client.sendMessage(TEST_NUMBER, `[TESTE] ${message}`);
  }

  return client.sendMessage(to, message);
}

module.exports = { safeSend };