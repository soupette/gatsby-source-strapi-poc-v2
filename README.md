# PoC Gatsby source plugin with Strapi v4.

Architecture:

```
./api // Strapi app
./example-app // Gatsby app
./gatsby-source-strapi-plugin // gatsby plugin
```

## Instructions

1. Setup:

Run the back-end

```bash
cd api && yarn
yarn develop
```

2. Install the source plugin dependencies

```bash
cd gatsby-source-strapi-plugin
yarn
```

3. Run the example app

```bash
cd example-site
yarn
yarn develop

```

## Credentials

Create an API_TOKEN and add it to the example-site .env file

> Make sure to create a full access token

```
STRAPI_TOKEN=<my-token>
```

### Note

- The `config.api.js` has been changed to

```js
module.exports = {
  rest: {
    defaultLimit: 25,
    maxLimit: null,
    withCount: true,
  },
};
```
