## Install dependencies

```
pnpm i
```

## Docker

Feel free to update docker-compose.yml to set passwords.

```
cd docker/
docker compose up -d
```

## Create .env file

In apps/frontend/.env, clone .env.sample and set the following variables:

```
BACKEND_URL=http://localhost:1337
```

In apps/backend/.env, clone .env.sample and set the following variables:

```
HOST=0.0.0.0
PORT=1337

# Secrets

APP_KEYS="toBeModified1,toBeModified2"
API_TOKEN_SALT=tobemodified
ADMIN_JWT_SECRET=tobemodified
TRANSFER_TOKEN_SALT=tobemodified
JWT_SECRET=tobemodified
ENCRYPTION_KEY=tobemodified

# Database

DATABASE_CLIENT=postgres
DATABASE_HOST=127.0.0.1
DATABASE_PORT=5432
DATABASE_NAME=todo
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
```

You can use openssl to generate your keys:

```
openssl rand -base64 16
```

## Start the project

```
pnpm --parallel dev
```
