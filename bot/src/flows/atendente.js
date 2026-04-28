module.exports = async (msg, state) => {
  state.step = 'atendente';

  return msg.reply('👨‍💼 Um atendente entrará em contato com você.');
};