const db = require('./db')
const { getUsuarioLogado } = require('../auth/auth')

const sql = `
    select
        u.*
    from
        usuarios u
    where
        u.id = :idUsuario
    limit 1
`


const getUsuario = async idUsuario => {
    const res = await db.raw(sql, { idUsuario })
    return res ? res[0][0] : null
}

module.exports = async req => {
    const usuario = await getUsuario(6)
    if (usuario) {
        const { token } = await getUsuarioLogado(usuario)
        req.headers = {
            authorization: `Bearer ${token}`
        }
    }
}