const jwt = require('jwt-simple')

module.exports = async({ req }) => {

    await require('./simularUsuarioLogado')(req) // se comentar essa linha, o usuario para de ser simulado, bom para testes em produção.
    const auth = req.headers.authorization
    const token = auth && auth.substring(7)
    const authSecret = process.env.APP_AUTH_SECRET

    let usuario = null
    let admin = false

    if (token) {
        try {
            let conteudoToken = jwt.decode(token, authSecret)
            usuario = conteudoToken

        } catch (e) {
            throw new Error('Acesso Negado, erro na validação!')
        }
    }

    if (usuario && usuario.id) {
        if (usuario.id === 6) { // ID do Usuario Admin, se no seu banco, o Admin for 1, substitua de 6 para 1!
            admin = usuario
        }
    }

    const err = new Error('Acesso Negado!')

    return {
        usuario,
        admin,
        validarUsuario() {
            if (!usuario) throw err
        },
        validarAdmin() {
            if (!admin) throw err
        },
        validarUsuarioFiltro(filtro) {
            if (admin) return
            if (!usuario) throw err
            if (!filtro) throw err

            const { id, nomeUsuario } = filtro

            if (!id && !nomeUsuario) throw err
            if (id && id !== usuario.id) throw err
            if (nomeUsuario && nomeUsuario !== usuario.nomeUsuario) throw err
        }

    }
}