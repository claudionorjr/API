/* Ctrl+Alt+N => executa
   Ctrl+Alt+N => para */

const db = require('../config/db')

const novoUsuario = {
    email: 'pedro',
    nome: 'Blablabla',
    senha: '789456'
}

async function databasejogo() {
    const { qtde } = await db('usuarios')
        .count('* as qtde').first()

    if (qtde === 0) {
        await db('usuarios').insert(novoUsuario)
    }

    let { id } = await db('usuarios')
        .select('id').limit(1).first()

    await db('usuarios').where({ id })
        .update({
            email: 'pedro1',
            nome: 'Blablabla1',
            senha: '7894561'
        })

    return db('usuarios').where({ id })
}

databasejogo()
    .then(usuario => console.log(usuario))