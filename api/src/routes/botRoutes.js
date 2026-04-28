const express = require('express');
const router = express.Router();
const { getBots, createBot } = require('../../../bot-manager/src/botManager.js');

router.get('/bots', (req, res) => {
  res.json(getBots());
});

router.post('/bots', (req, res) => {
  const { companyId } = req.body;

  const bot = createBot(companyId);

  res.json({ message: 'Bot criado', bot });
});

module.exports = router;