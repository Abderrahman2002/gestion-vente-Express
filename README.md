# Gestion de Vente Application

Une application de gestion des ventes construite avec Express.js, MongoDB et Docker.

## Comment installer

1. Cloner le projet
```bash
git clone https://github.com/Abderrahman2002/gestion-vente-Express.git
cd gestion-vente-Express
```

2. Installer les dépendances
```bash
npm install
```

3. Configurer l'environnement
```bash
# Copier le fichier d'exemple
cp .env.example .env

# Modifier les variables d'environnement dans .env avec vos informations
MONGODB_USERNAME=votre_username
MONGODB_PASSWORD=votre_password
MONGODB_CLUSTER=votre_cluster
MONGODB_DATABASE=gestionVente
```

4. Démarrer l'application


Option A - Sans Docker:

```bash
npm run seed
```

```bash
npm run dev
```

Option B - Avec Docker:
```bash
# Construire et démarrer les conteneurs
docker-compose up -d --build
```

## Accès à l'application

- URL locale: http://localhost:3000
- Identifiants par défaut:
  - Admin: admin@example.com / admin123
  - User: user@example.com / user123

## Fonctionnalités

- Gestion des produits (CRUD)
- Gestion des ventes
- Tableau de bord avec statistiques
- Authentification utilisateur
- Sauvegarde/restauration de la base de données

## Commandes utiles

```bash
# Démarrer l'application
npm run dev

# Créer une sauvegarde de la base de données
npm run backup

# Restaurer une sauvegarde
node scripts/restore-db.js nom_du_fichier_backup.json

# Initialiser les données de test
npm run seed
```

## Structure du projet

```
gestionVenteJS/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── index.js
├── views/
│   ├── layouts/
│   ├── produits/
│   └── ventes/
├── scripts/
│   ├── backup-db.js
│   └── restore-db.js
├── .env
├── docker-compose.yml
└── Dockerfile
```

## Base de données

MongoDB Atlas est utilisé comme base de données. Assurez-vous de:
1. Créer un compte MongoDB Atlas
2. Créer un cluster
3. Ajouter votre IP à la liste blanche
4. Créer un utilisateur de base de données
5. Mettre à jour le fichier .env avec vos informations de connexion

## Support

Pour toute question ou problème, veuillez ouvrir une issue sur GitHub.
