const service = require('../services/userService');

async function getImoveis(req, res) {
  const imoveis = await service.getImoveis();
  res.json(imoveis);
}

module.exports = { getImoveis };