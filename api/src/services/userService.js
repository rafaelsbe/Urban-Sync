async function getImoveis() {
  return [
    { nome: 'Imóvel 1', preco: 100000 },
    { nome: 'Imóvel 2', preco: 200000 }
  ];
}

module.exports = { getImoveis };