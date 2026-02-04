# US-MVP-04.10 : Upload photo adhérent

| Métadonnée | Valeur |
|------------|--------|
| **ID** | US-MVP-04.10 |
| **Epic** | E-MVP-04 : Gestion Adhérents |
| **Milestone** | MVP |
| **Priorité** | P1 |
| **PRD** | [prd-faatere-v1.md](../../prd-faatere-v1.md) |

---

## User Story

**En tant que** gestionnaire,
**Je veux** ajouter une photo à un adhérent,
**Afin qu'** elle apparaisse sur sa carte.

---

## Critères d'acceptance

- [ ] Endpoint POST /members/:id/photo (multipart/form-data)
- [ ] Formats acceptés : JPG, PNG
- [ ] Taille max : 5 MB
- [ ] Redimensionnement automatique (max 800x800)
- [ ] Stockage S3 (Railway)
- [ ] Retourne URL de la photo

### Frontend

- [ ] Input file avec preview
- [ ] Crop/resize côté client optionnel
- [ ] Indicateur de progression upload

---

## Tâches techniques

### Backend

- [ ] Configurer service de stockage S3 (MinIO en dev)
- [ ] Créer endpoint upload avec multer
- [ ] Valider le type MIME
- [ ] Redimensionner avec sharp
- [ ] Uploader vers S3
- [ ] Mettre à jour photoUrl dans la DB

### Frontend

- [ ] Créer composant PhotoUploader
- [ ] Implémenter preview avant upload
- [ ] Afficher progression
- [ ] Gérer les erreurs (taille, format)

---

## Configuration S3

```typescript
// Dev (MinIO)
S3_ENDPOINT=http://localhost:9000
S3_ACCESS_KEY=minioadmin
S3_SECRET_KEY=minioadmin
S3_BUCKET=faatere-uploads

// Prod (Railway Object Storage ou AWS S3)
S3_ENDPOINT=https://...
S3_ACCESS_KEY=...
S3_SECRET_KEY=...
S3_BUCKET=faatere-uploads
```

---

## Dépendances

- US-MVP-04.5 : Voir détail adhérent
- US-MVP-01.3 : Setup Docker Compose (MinIO)

---

## Notes

Le redimensionnement côté serveur garantit des performances optimales pour l'affichage et les cartes d'adhérent.
