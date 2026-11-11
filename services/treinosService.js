const repository = require('../repositories/treinosRepository.js');

function validarTreino(corpo) {
  if (!corpo || typeof corpo.nome !== 'string' || corpo.nome.trim() === '') {
    return 'O campo nome e obrigatorio e deve ser um texto.';
  }

  if (typeof corpo.duracao !== 'number' || corpo.duracao <= 0 || corpo.duracao > 180) {
    return 'O campo duracao e obrigatorio e deve ser um numero maior que zero e menor ou igual a 180.';
  }

  return null;
}

function listarTodos(filtros = {}) {
  const { minimo, busca } = filtros;
  const params = {};

  if (minimo !== undefined) {
    const valor = Number(minimo);

    if (!Number.isFinite(valor) || valor < 0) {
      return { erro: 'Parametro minimo invalido.' };
    }

    params.minimo = valor;
  }

  if (busca !== undefined) {
    const termo = String(busca).trim();
    params.busca = termo === '' ? undefined : termo;
  }

  return repository.listarTodos(params);
}

function buscarPorId(id) {
  return repository.buscarPorId(id);
}

function criarTreino(corpo) {
  const erro = validarTreino(corpo);

  if (erro !== null) {
    return { erro: erro };
  }

  const novo = repository.criar(corpo.nome, corpo.duracao);
  return { treino: novo };
}

function atualizarTreino(id, corpo) {
  const existente = repository.buscarPorId(id);

  if (existente === undefined) {
    return { naoEncontrado: true };
  }

  const erro = validarTreino(corpo);

  if (erro !== null) {
    return { erro: erro };
  }

  const atualizado = repository.atualizar(id, corpo.nome, corpo.duracao);
  return { treino: atualizado };
}

function removerTreino(id) {
  const existente = repository.buscarPorId(id);

  if (existente === undefined) {
    return { naoEncontrado: true };
  }

  repository.remover(id);
  return { removido: true };
}

function totalTreinos() {
  return repository.totalTreinos();
}

function resumoTreinos() {
  return repository.resumoTreinos();
}

module.exports = {
  listarTodos,
  buscarPorId,
  criarTreino,
  atualizarTreino,
  removerTreino,
  totalTreinos,
  resumoTreinos,
  validarTreino,
};
