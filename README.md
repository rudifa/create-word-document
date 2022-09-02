
[How to Create Word Documents with Node.js](https://medium.com/swlh/how-to-create-word-documents-with-node-js-4f74d6d4662c)


### errors

```
backend % npx sequelize-cli db:migrate                                                            [main L|…3]

Sequelize CLI [Node: 16.15.0, CLI: 6.4.1, ORM: 6.21.4]


ERROR: Error reading "config/config.js". Error: SyntaxError: Unexpected token ':'

```
- renamed file to `config.json`, fixed.

```
backend % npm start                                                                      [main L|✔]

> backend@0.0.0 start
> nodemon --exec npm run babel-node --  ./bin/www

[nodemon] 2.0.19
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `npm run babel-node ./bin/www`

> backend@0.0.0 babel-node
> babel-node

node:internal/modules/cjs/loader:936
  throw err;
  ^

Error: Cannot find module 'dotenv'

```

- `npm i dotenv` should fix it


 