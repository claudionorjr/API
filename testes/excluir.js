/* 
Ctrl+Alt+N => executa
Ctrl+Alt+N => para */

const db = require('../config/db')

db('usuarios').where({ id: 1 })
    .delete()
    .then(res => console.log(res)) //qtd de elementos deletados