const express = require('express');

const routes = express.Router();

routes.get('/', (req, res) => {
  res.status(200).send({
    title: 'Projeto Final {reprograma} - SheSpeak!',
    version: '1.0.0',
    mensagem:
      'SheSpeak! é uma API que reúne professoras de idiomas que gostariam de se voluntariar e mulheres de baixa renda que tenham interesse em aprender um novo idioma. Essa API será um espaço seguro, onde aceitará apenas a participação de mulheres, tanto como alunas quanto como professoras.',
  });
});

module.exports = routes;
