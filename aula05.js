let usuarioLogado = null; // <-- uma variavel para o servidor inteiro
app.post('/login', (req, res) => {
// ... conferiu usuario e senha ...
usuarioLogado = usuario; // "lembrei quem logou"
res.json({ ok: true });
});
app.get('/perfil', (req, res) => {
res.json(usuarioLogado); // "e esse aqui"
});

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
