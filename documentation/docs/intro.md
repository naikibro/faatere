---
id: intro
slug: /
title: Getting Started
---

# Faatere

<div style={{textAlign: 'center', marginBottom: '2rem'}}>
  <img src="/img/logos/2.png" alt="Faatere Logo" width="120" />
</div>

**Faatere** ("To lead" in Tahitian) is a member management application designed for Polynesian political parties. It enables party administrators and local section managers to efficiently track memberships, organize local sections (tomites), and maintain member engagement.

## Tech Stack

<div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem'}}>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS" />
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React_Native-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React Native" />
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
</div>

## What Problem Does Faatere Solve?

Political parties in French Polynesia face unique challenges:

- **Geographical dispersion**: Members are spread across multiple islands, making centralized management difficult
- **Offline access needs**: Many areas have limited internet connectivity, requiring offline-capable solutions
- **Organizational hierarchy**: Parties are structured into local sections (tomites) that need autonomous management while maintaining central oversight

Faatere addresses these challenges with a modern, offline-first architecture that works across web and mobile platforms.

---

## Core User Stories

### For Party Administrators

> As an **administrator**, I want to have a complete overview of all members and tomites so that I can monitor party growth and activity across all regions.

> As an **administrator**, I want to manage user roles and permissions so that tomite managers can only access their own section's data.

### For Tomite Managers

> As a **tomite manager**, I want to register new members in my section so that I can grow local membership.

> As a **tomite manager**, I want to view statistics about my tomite so that I can report on local activity to party leadership.

### For Field Workers (Mobile)

> As a **field worker**, I want to register members even without internet connection so that I can work in remote areas.

> As a **field worker**, I want my data to automatically sync when I regain connectivity so that the central database stays up to date.

---

## Quick Start

Start the entire development environment with a single command:

```bash
docker compose up -d
```

This starts all services:

| Service       | URL                   | Description             |
| ------------- | --------------------- | ----------------------- |
| Backend API   | http://localhost:3001 | NestJS REST API         |
| Frontend      | http://localhost:3000 | Next.js web application |
| Documentation | http://localhost:3002 | This documentation      |
| PostgreSQL    | localhost:5432        | Database                |
| MinIO         | http://localhost:9001 | File storage console    |
| Adminer       | http://localhost:8080 | Database management     |

---

## Project Structure

```
faatere/
├── services/backend/   # NestJS API
├── frontend/           # Next.js web application
├── mobile/             # React Native mobile app (Expo)
├── shared/             # Shared TypeScript types
└── documentation/      # This documentation
```
