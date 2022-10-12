
[How to Create Word Documents with Node.js](https://medium.com/swlh/how-to-create-word-documents-with-node-js-4f74d6d4662c)

### start

In separate terminal windows:
- `cd backend && npm start`
- `cd frontend && npm start`

TODO
- elaborate parallel start, including cleanup of previous processes

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


```
Uncaught Error: [MobX] Cannot apply 'observable' to 'Function@1.documents': Field not found.
    at die (errors.ts:84:1)
    at ObservableObjectAdministration.make_ (observableobject.ts:259:1)
    at makeObservable.ts:43:1
    at Array.forEach (<anonymous>)
    at makeObservable (makeObservable.ts:43:1)
    at ./src/store.js (store.js:9:1)
    at options.factory (react refresh:6:1)
    at __webpack_require__ (bootstrap:24:1)
    at fn (hot module replacement:62:1)
    at ./src/App.js (bundle.js:21:64)
content.js:6 
``` 
- fixed using `makeAutoObservable` in `class DocumentStore`
 
```
GET http://localhost:3000/document 404 (Not Found)
```
- tried `mkdir backend/document`, did not fix the problem

### debugging

Tried to debug the backend with `launch.json`

```
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [

    {
      "type": "node",
      "request": "launch",
      "name": "Launch Backend",
      "skipFiles": [
        "<node_internals>/**"
      ],
      "cwd": "${workspaceFolder}/backend",
      "runtimeExecutable": "/usr/local/bin/npm",
      "runtimeArgs": [
        "run",
        "babel-node",
        "--",
        "./bin/www"
      ],
      "program": "${workspaceFolder}/backend/app.js",
    }
  ]
}
```
This does launch the backend server, but debugger is not connected.

