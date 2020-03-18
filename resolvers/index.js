const usuarios = require('./usuarios');

module.exports = {
    Query: { ...usuarios.Query },
    Mutation: { ...usuarios.Mutation },
}