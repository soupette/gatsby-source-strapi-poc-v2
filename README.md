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

Go to the admin panel and create an API_TOKEN with full access

2. Install the source plugin dependencies

```bash
cd gatsby-source-strapi-plugin
yarn
```

3. Run the example app

> UPDATE the .env file with the correct API_TOKEN
> The file is committed

Path: `example-site/.env`

```bash
STRAPI_TOKEN=<my-token>
STRAPI_API_URL=http://localhost:1337
```

```bash
cd example-site
yarn
yarn develop

```
