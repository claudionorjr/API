/* Ctrl+Alt+N => executa
   Ctrl+Alt+N => para */

const db = require('../config/db')

//consulta todos ususarios
/*db('usuarios')
    .then(res => console.log(res))
    .catch(err => console.log(err.sqlMessage))*/

//consulta pelas colunas
db('usuarios').select('id', 'nome')
    .then(res => console.log(res))
    .catch(err => console.log(err.sqlMessage))