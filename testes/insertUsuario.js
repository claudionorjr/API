/* Ctrl+Alt+N => executa
   Ctrl+Alt+N => para */

const db = require('../config/db')

const novo = {
    nome: 'teste1',
    email: 'teste1',
    senha: '123456'
}

db('usuarios').insert(novo)
    .then(res => console.log(res))
    .catch(err => console.log(err.sqlMessage))