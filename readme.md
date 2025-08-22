# Deployment Documentation

This monorepo contains a Next.js frontend and Strapi backend with PostgreSQL database. This guide covers both development and production deployment scenarios.

## Project Structure

```
├── apps/
│   ├── frontend/          # Next.js application
│   └── backend/           # Strapi CMS
├── docker/
│   └── docker-compose.yml # Database services
└── package.json           # Workspace configuration
```

## Development Setup

### Prerequisites

- Node.js 18+
- pnpm
- Docker and Docker Compose

### 1. Install Dependencies

```bash
pnpm i
```

### 2. Start Database Services

Navigate to the docker directory and start PostgreSQL and pgAdmin:

```bash
cd docker/
docker compose up -d
```

This will start:
- PostgreSQL on port 5432
- pgAdmin on port 27018 (accessible at http://localhost:27018)

**pgAdmin Credentials:**
- Email: email@provider.com
- Password: mypassword

### 3. Environment Configuration

#### Frontend Environment (`apps/frontend/.env`)

Copy `.env.sample` to `.env` and configure:

```env
BACKEND_URL=http://localhost:1337
```

#### Backend Environment (`apps/backend/.env`)

Copy `.env.sample` to `.env` and configure:

```env
HOST=0.0.0.0
PORT=1337

# Secrets (generate with: openssl rand -base64 16)
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

**Security Note:** Generate secure keys using:
```bash
openssl rand -base64 16
```

### 4. Database Setup

Create the database in PostgreSQL:

1. Access pgAdmin at http://localhost:27018
2. Create a new database named `todo`
3. Or use psql command:
```bash
docker exec -it docker-db-1 psql -U postgres -c "CREATE DATABASE todo;"
```

### 5. Import Strapi Data (Optional)

There is already existing Strapi data to import, inside `apps/backend/accesstime-blog-import.tar`

```bash
cd apps/backend
pnpm strapi import --file accesstime-blog-import.tar
```

**Note:** Run this after starting the backend for the first time to ensure all tables are created.

### 6. Start Development Servers

```bash
pnpm --parallel dev
```

This starts both:
- Frontend: http://localhost:3000
- Backend: http://localhost:1337

## Production Deployment

### Docker-based Production Setup

#### 1. Create Production Docker Compose

Create `docker-compose.prod.yml`:

```yaml
version: "3.8"

services:
  db:
    image: bitnami/postgresql:latest
    restart: always
    environment:
      - POSTGRES_PASSWORD=${DB_PASSWORD}
      - POSTGRES_USER=${DB_USER}
      - POSTGRES_DB=${DB_NAME}
    networks:
      - app-network
    volumes:
      - db_data:/bitnami/postgresql
    ports:
      - "5432:5432"

  backend:
    build:
      context: .
      dockerfile: apps/backend/Dockerfile
    restart: always
    environment:
      - NODE_ENV=production
      - HOST=0.0.0.0
      - PORT=1337
      - DATABASE_HOST=db
      - DATABASE_PORT=5432
      - DATABASE_NAME=${DB_NAME}
      - DATABASE_USERNAME=${DB_USER}
      - DATABASE_PASSWORD=${DB_PASSWORD}
    networks:
      - app-network
    ports:
      - "1337:1337"
    depends_on:
      - db

  frontend:
    build:
      context: .
      dockerfile: apps/frontend/Dockerfile
    restart: always
    environment:
      - NEXT_PUBLIC_BACKEND_URL=http://backend:1337
    networks:
      - app-network
    ports:
      - "3000:3000"
    depends_on:
      - backend

volumes:
  db_data:

networks:
  app-network:
    driver: bridge
```

#### 2. Create Dockerfiles

**Backend Dockerfile** (`apps/backend/Dockerfile`):

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./
COPY apps/backend/package.json ./apps/backend/

# Install pnpm and dependencies
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

# Copy backend source
COPY apps/backend ./apps/backend

WORKDIR /app/apps/backend

# Build the application
RUN pnpm build

EXPOSE 1337

CMD ["pnpm", "start"]
```

**Frontend Dockerfile** (`apps/frontend/Dockerfile`):

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./
COPY apps/frontend/package.json ./apps/frontend/

# Install pnpm and dependencies
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

# Copy frontend source
COPY apps/frontend ./apps/frontend

WORKDIR /app/apps/frontend

# Build the application
RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]
```

#### 3. Production Environment Variables

Create `.env.production`:

```env
DB_NAME=todo_prod
DB_USER=postgres
DB_PASSWORD=secure_password_here

# Backend secrets
APP_KEYS="secure_key_1,secure_key_2"
API_TOKEN_SALT=secure_salt_here
ADMIN_JWT_SECRET=secure_jwt_secret_here
TRANSFER_TOKEN_SALT=secure_transfer_salt_here
JWT_SECRET=secure_jwt_secret_here
ENCRYPTION_KEY=secure_encryption_key_here
```

#### 4. Deploy to Production

```bash
# Build and start all services
docker-compose -f docker-compose.prod.yml --env-file .env.production up -d --build

# Check service status
docker-compose -f docker-compose.prod.yml ps

# View logs
docker-compose -f docker-compose.prod.yml logs -f
```

### Alternative: Manual Production Deployment

#### 1. Build Applications

```bash
# Build backend
cd apps/backend
pnpm build

# Build frontend
cd ../frontend
pnpm build
```

#### 2. Start Services

```bash
# Start backend
cd apps/backend
NODE_ENV=production pnpm start

# Start frontend (in another terminal)
cd apps/frontend
pnpm start
```

## Data Management

### Backup Strapi Data

```bash
cd apps/backend
npx strapi export --no-encrypt --file backup-$(date +%Y%m%d).tar.gz
```

### Restore Strapi Data

```bash
cd apps/backend
npx strapi import --file accesstime-blog-import.tar.gz
```

### Database Backup

```bash
# Backup
docker exec docker_db_1 pg_dump -U postgres todo > backup.sql

# Restore
docker exec -i docker_db_1 psql -U postgres todo < backup.sql
```

## Troubleshooting

### Common Issues

1. **Port conflicts**: Ensure ports 3000, 1337, and 5432 are available
2. **Database connection**: Verify DATABASE_HOST matches your Docker setup
3. **CORS issues**: Check BACKEND_URL in frontend environment
4. **Permission errors**: Ensure proper file permissions for Docker volumes

### Health Checks

```bash
# Check if services are running
curl http://localhost:3000        # Frontend
curl http://localhost:1337/api    # Backend API
curl http://localhost:1337/admin  # Strapi Admin

# Check database connection
docker exec docker_db_1 psql -U postgres -c "SELECT version();"
```

### Logs

```bash
# Development logs
pnpm --parallel dev

# Production logs
docker-compose -f docker-compose.prod.yml logs -f [service_name]
```

## Security Considerations

1. **Change default passwords** in production
2. **Generate secure keys** for all secrets
3. **Use environment variables** for sensitive data
4. **Enable SSL/HTTPS** in production
5. **Configure firewall rules** appropriately
6. **Regular database backups**

## Monitoring

Consider adding monitoring tools like:
- **Uptime monitoring**: Pingdom, UptimeRobot
- **Application monitoring**: Sentry, LogRocket
- **Server monitoring**: Prometheus + Grafana
- **Log aggregation**: ELK Stack, Fluentd

## Scaling

For high-traffic scenarios:
- Use **reverse proxy** (Nginx, Cloudflare)
- Implement **load balancing**
- Consider **database clustering**
- Use **CDN** for static assets
- Implement **caching** strategies