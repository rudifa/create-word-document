[How to Create Word Documents with Node.js](https://medium.com/swlh/how-to-create-word-documents-with-node-js-4f74d6d4662c)

## START

In separate terminal windows:

- `cd backend && npm start`
- `cd frontend && npm start`

## DONE

- replaced `html-docx-js` by `html-to-docx` (newer, actively maintained)

## TODO

- elaborate parallel start, including cleanup of previous processes
- in frontend `DocumentForm.js`: find a way to close the Modal dialog on Cancel.

## ERRORS

8. `Generate Document` works (creates a `.docx` file in `backend/files`), but text is missing when opened in Pages.
   Fixed by switching to html-to-docx package.

> 7. OPEN `DocumentForm`: `Save` works, `Cancel` has no effect.

6. "onInit" property is not supported anymore by the CKEditor

```
Warning: Failed prop type: The "onInit" property is not supported anymore by the CKEditor component. Use the "onReady" property instead.
```

Prevents Save from working. Fixed as suggested in the diagnostic.

5. import CKEditor failed

Diagnostic similar to above in 4.

Replaced

```
import CKEditor from "@ckeditor/ckeditor5-react";
```

by

```
import {CKEditor} from "@ckeditor/ckeditor5-react";
```

following the example in [CKEditor 5 docs](https://ckeditor.com/docs/ckeditor5/latest/installation/getting-started/frameworks/react.html)

4. `undefined` for `Form.Row`

```
react-jsx-dev-runtime.development.js:87 Warning: React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.

Check your code at DocumentForm.js:52.

...
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Row> // line 52

```

- diagnosed by adding a log that showed `undefined` for `Form.Row`

```
console.log(`DocumentForm.js: Form: ${typeof Form}, Form.Row: ${typeof Form.Row}, CKEditor: ${typeof CKEditor}`);

```

- Fixed by importing and using Row (following a hint on StackOverflow)

```
import Row from "react-bootstrap/Row";
...
          <Form noValidate onSubmit={handleSubmit}>
            <Row>
```

3. Cannot apply 'observable'

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

2. Cannot find module 'dotenv'

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

- Fixed: `npm i dotenv`

1. Unexpected token ':'

```
backend % npx sequelize-cli db:migrate                                                            [main L|…3]

Sequelize CLI [Node: 16.15.0, CLI: 6.4.1, ORM: 6.21.4]

ERROR: Error reading "config/config.js". Error: SyntaxError: Unexpected token ':'

```

- Fixed: renamed file to `config.json`.

## DEBUGGING

1. Tried to debug the backend with `launch.json`

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

2. Use console.log in backend

This works, prints to the backend terminal window.

3. Use debug in backend

See backend/bin/www.

Did not try it, needs launching with an env variable.

4. Use console.log in frontend

This works, prints to the devtools console.
