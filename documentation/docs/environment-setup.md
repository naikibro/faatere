---
id: environment-setup
title: Environment Setup
---

# Environment Setup

This guide explains how to set up the local development environment using Docker.

---

## Prerequisites

Before starting, ensure you have the following installed:

- **Docker Desktop** (includes Docker Compose)
- **Git**

That's it. All other dependencies (Node.js, PostgreSQL, etc.) run inside Docker containers.

---

## Setup

### 1. Clone the Repository

```bash
git clone git@github.com:faatere/faatere.git
cd faatere
```

### 2. Configure Environment Variables

```bash
cp .env.example .env
```

The default values in `.env.example` work out of the box for local development. No changes are required.

### 3. Start Everything

```bash
docker compose up -d
```

This single command starts all services:

| Service | URL | Purpose |
| ------- | --- | ------- |
| **backend** | http://localhost:3001 | NestJS API |
| **frontend** | http://localhost:3000 | Next.js web app |
| **documentation** | http://localhost:3002 | Docusaurus docs |
| **postgres** | localhost:5432 | PostgreSQL database |
| **minio** | http://localhost:9001 | S3-compatible file storage |
| **adminer** | http://localhost:8080 | Database management UI |

### 4. Verify Services

Check that all containers are running:

```bash
docker compose ps
```

You should see all services with status `Up`.

---

## Accessing Services

### Backend API

The API is available at `http://localhost:3001`. Swagger documentation is at `http://localhost:3001/api`.

### Frontend

The web application is available at `http://localhost:3000`.

### Database (Adminer)

Access Adminer at `http://localhost:8080` with these credentials:

| Field | Value |
| ----- | ----- |
| System | PostgreSQL |
| Server | postgres |
| Username | faatere |
| Password | faatere_dev_password |
| Database | faatere |

### File Storage (MinIO)

Access the MinIO console at `http://localhost:9001`:

| Field | Value |
| ----- | ----- |
| Username | minioadmin |
| Password | minioadmin |

---

## Common Operations

### View Logs

```bash
# All services
docker compose logs -f

# Specific service
docker compose logs -f backend
```

### Restart a Service

```bash
docker compose restart backend
```

### Stop Everything

```bash
docker compose down
```

### Rebuild After Code Changes

For most changes, hot reload handles updates automatically. If you modify dependencies or Dockerfiles:

```bash
docker compose up -d --build
```

---

## Troubleshooting

### Port Already in Use

If a port is already in use, find and stop the conflicting process:

```bash
lsof -i :3001
kill -9 <PID>
```

Or change the port in `.env`:

```bash
BACKEND_PORT=3002
```

### Database Connection Issues

If the backend can't connect to PostgreSQL, wait a few seconds for the database to initialize, then restart:

```bash
docker compose restart backend
```

### Fresh Start

To completely reset the environment:

```bash
docker compose down -v  # -v removes volumes (deletes database)
docker compose up -d
```
