const db = require('../config/db')
const bcrypt = require('bcrypt-nodejs')
const { getUsuarioLogado } = require('../auth/auth')

function indiceUsuario(filtro) { 
    if (!filtro) return null
    const { id, email } = filtro
    if (id) {
        return db('usuarios')
            .where({ id })
            .first()
    } else if (email) {
        return db('usuarios')
            .where({ email })
            .first()
    } else {
        return null
    }
}
module.exports = {
    Query: {
        usuarios(parent, args, ctx) {
            ctx && ctx.validarAdmin()
            return db('usuarios')
        },
        usuario(_, { filtro }, ctx) {
            ctx && ctx.validarUsuarioFiltro(filtro)
            const usuario = indiceUsuario(filtro)
            return usuario
        },
        async login(_, { dados }) {
            const usuario = await db('usuarios').where({ email: dados.email }).first()
            if (!usuario) {
                throw new Error('Usuário/Senha inválido!')
            }

            const saoIguais = bcrypt.compareSync(dados.senha, usuario.senha)
            if (!saoIguais) {
                throw new Error('Usuário/Senha inválido!')
            }

            return await getUsuarioLogado(usuario)
        }
    },

    Mutation: {
        async novoUsuario(_, { dados }) {
            try {
                const salt = bcrypt.genSaltSync()
                dados.senha = bcrypt.hashSync(dados.senha, salt)
                const [id] = await db('usuarios').insert(dados)
                return db('usuarios').where({ id }).first()

            } catch (e) {
                throw new Error('Erro na criação! Email Existente!')
            }
        },

        async excluirUsuario(_, { filtro }, ctx) {
            ctx && ctx.validarAdmin()
            try {
                const usuario = await indiceUsuario(filtro)
                if (usuario) {
                    const { id } = usuario
                    await db('usuarios').where({ id }).delete()
                }
                return usuario
            } catch (e) {
                throw new Error('Erro ao excluir!')
            }
        },

        async alterarUsuario(_, { filtro, dados }) {
            ctx && ctx.validarUsuarioFiltro(filtro)
            try {
                const usuario = await indiceUsuario(filtro)
                if (usuario) {

                    if (dados.senha) {
                        const salt = bcrypt.genSaltSync()
                        dados.senha = bcrypt.hashSync(dados.senha, salt)
                    }

                    const { id } = usuario
                    await db('usuarios')
                        .where({ id })
                        .update(dados)
                }
                return !usuario ? null : {...usuario, ...dados }
            } catch (e) {
                throw new Error('Erro em alterar!')
            }
        }
    }
}