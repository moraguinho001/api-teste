db.exec(`
CREATE TABLE IF NOT EXISTS usuarios (
id INTEGER PRIMARY KEY AUTOINCREMENT,
usuario TEXT NOT NULL UNIQUE,
senha TEXT NOT NULL
)
`);
// dois usuarios de teste, so se a tabela estiver vazia
const qtd = db.prepare('SELECT COUNT(*) AS n FROM usuarios').get().n;
if (qtd === 0) {
const ins = db.prepare('INSERT INTO usuarios (usuario, senha) VALUES (?, ?)');
ins.run('diego', '1234');
ins.run('aluno', 'senha');
}

const { randomUUID } = require('node:crypto');
const sessoes = new Map(); // token -> id do usuario
function criar(usuarioId) {
const token = randomUUID(); // etiqueta aleatoria e unica
sessoes.set(token, usuarioId);
return token;
}
function usuarioIdDaSessao(token) {
return sessoes.get(token); // o id, ou undefined se nao existe
}
function encerrar(token) {
sessoes.delete(token);
}
module.exports = { criar, usuarioIdDaSessao, encerrar };
