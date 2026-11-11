const db = require('../banco.js');

function listarTodos({ minimo, busca } = {}) {
  let sql = 'SELECT * FROM treinos';
  const params = [];

  if (minimo !== undefined) {
    sql += ' WHERE duracao >= ?';
    params.push(Number(minimo));
  }

  if (busca !== undefined) {
    const termo = String(busca).trim();
    if (termo !== '') {
      sql += (sql.includes('WHERE') ? ' AND ' : ' WHERE ') + 'nome LIKE ?';
      params.push(`%${termo}%`);
    }
  }

  sql += ' ORDER BY duracao DESC';

  return db.prepare(sql).all(...params);
}

function buscarPorId(id) {
  return db.prepare('SELECT * FROM treinos WHERE id = ?').get(id);
}

function criar(nome, duracao) {
  const resultado = db
    .prepare('INSERT INTO treinos (nome, duracao) VALUES (?, ?)')
    .run(nome, duracao);

  return buscarPorId(resultado.lastInsertRowid);
}

function atualizar(id, nome, duracao) {
  db.prepare('UPDATE treinos SET nome = ?, duracao = ? WHERE id = ?').run(
    nome,
    duracao,
    id
  );

  return buscarPorId(id);
}

function remover(id) {
  const resultado = db.prepare('DELETE FROM treinos WHERE id = ?').run(id);
  return resultado.changes > 0;
}

function totalTreinos() {
  const total = db.prepare('SELECT COUNT(*) AS total FROM treinos').get();
  return Number(total.total);
}

function resumoTreinos() {
  const resumo = db
    .prepare(
      'SELECT COUNT(*) AS total, COALESCE(SUM(duracao), 0) AS minutos, COALESCE(AVG(duracao), 0) AS media FROM treinos'
    )
    .get();

  return {
    total: Number(resumo.total),
    minutos: Number(resumo.minutos),
    media: Number(resumo.media),
  };
}

module.exports = {
  listarTodos,
  buscarPorId,
  criar,
  atualizar,
  remover,
  totalTreinos,
  resumoTreinos,
};
