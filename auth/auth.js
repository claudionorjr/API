const jwt = require('jwt-simple')

module.exports = {
    async getUsuarioLogado(usuario) {
        const usuarioInfo = {
            ...usuario,

        }

        const authSecret = process.env.APP_AUTH_SECRET
        return {
            ...usuarioInfo,
            token: jwt.encode(usuarioInfo, authSecret)
        }
    }

}