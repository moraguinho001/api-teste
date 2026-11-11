const service = require('../services/treinosService.js');

function listar(req, res) {
  const resultado = service.listarTodos(req.query);

  if (resultado.erro !== undefined) {
    return res.status(400).json({ erro: resultado.erro });
  }

  return res.status(200).json(resultado);
}

function total(req, res) {
  const resultado = service.totalTreinos();
  return res.status(200).json({ total: resultado });
}

function resumo(req, res) {
  const resultado = service.resumoTreinos();
  return res.status(200).json(resultado);
}

function buscarUm(req, res) {
  const idParam = req.params.id;

  if (!/^\d+$/.test(idParam)) {
    return res.status(400).json({ erro: 'Id invalido.' });
  }

  const id = Number(idParam);
  const treino = service.buscarPorId(id);

  if (treino === undefined) {
    return res.status(404).json({ erro: 'Treino nao encontrado.' });
  }

  return res.status(200).json(treino);
}

function criar(req, res) {
  const resultado = service.criarTreino(req.body);

  if (resultado.erro !== undefined) {
    return res.status(400).json({ erro: resultado.erro });
  }

  return res.status(201).json(resultado.treino);
}

function atualizar(req, res) {
  const idParam = req.params.id;

  if (!/^\d+$/.test(idParam)) {
    return res.status(400).json({ erro: 'Id invalido.' });
  }

  const id = Number(idParam);
  const resultado = service.atualizarTreino(id, req.body);

  if (resultado.naoEncontrado === true) {
    return res.status(404).json({ erro: 'Treino nao encontrado.' });
  }

  if (resultado.erro !== undefined) {
    return res.status(400).json({ erro: resultado.erro });
  }

  return res.status(200).json(resultado.treino);
}

function remover(req, res) {
  const idParam = req.params.id;

  if (!/^\d+$/.test(idParam)) {
    return res.status(400).json({ erro: 'Id invalido.' });
  }

  const id = Number(idParam);
  const resultado = service.removerTreino(id);

  if (resultado.naoEncontrado === true) {
    return res.status(404).json({ erro: 'Treino nao encontrado.' });
  }

  return res.status(204).end();
}

module.exports = { listar, total, resumo, buscarUm, criar, atualizar, remover };
