# API
Uma pequena API, desenvolvida em Graphql, Apollo, JS, Knex e com autenticação jwt e bcrypt.


1) npm install
"dependencies": {
        "apollo-server": "^2.4.8",
        "apollo-server-core": "^2.4.8",
        "graphql": "^14.2.1",
        "graphql-import": "^0.7.1",
        "knex": "^0.20.10",
        "mysql": "^2.18.1",
        "dotenv": "^7.0.0",
        "jwt-simple": "^0.5.6",
        "bcrypt-nodejs": "0.0.3"
    },
    
2) precisará configurar mySQL em seu computador e fazer alterações no .env.
NODE_ENV=development
#NODE_ENV=production

APP_DB_HOST=localhost
APP_DB_PORT=3306
APP_DB_NAME=Nome da Database
APP_DB_USER=root
APP_DB_PASSWORD=sua senha

APP_AUTH_SECRET=precisa gerar uma secret key

3) executar a migration

4) e usar com npm install
