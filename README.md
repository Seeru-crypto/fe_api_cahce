# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json', './tsconfig.app.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list




1. Toggle with text interenet is on/ off
2. axios setup for a POST, DELETE and GET requests (generates random number plates AAA-000)
3. implement cahce



http://localhost:4000/plates

GET  /users - This retrieves a list of all resource entities of users.
GET /users/:id - This retrieves a specific user by its id.
POST /users - This creates a new user.
PUT /users/:id - This updates a user based on a specified id.
DELETE /users/:id - This deletes a user based on the specified id.




1. finish the offline cache´ng
2. Add API health check + banner


## Notes
- There is a problem with the caching where if, network is re-established then axios will execute all the requests, but if the
- original method has any addition steps to complete then those will not be executed, since the original request has timed out already. 

