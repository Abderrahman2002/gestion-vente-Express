require('dotenv').config({ path: '.env' });
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./database/connect');
// Update model imports to use correct path
const Produit = require('./models/Produit');
const Vente = require('./models/Vente');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const ejsLayouts = require('express-ejs-layouts');
const path = require('path');
const utilisateurRoutes = require('./routes/UtilisateurRoutes');
const venteRoutes = require('./routes/VenteRoutes');
const dashboardRoutes = require('./routes/DashboardRoutes');
const produitRoutes = require('./routes/ProduitRoutes');

// Initialisation de l'application Express
const app = express();

// Connexion à la base de données
connectDB();

// Configuration des middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuration des sessions
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ 
        mongoUrl: `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.mongodb.net/${process.env.MONGODB_DATABASE}`,
        ttl: 24 * 60 * 60, // 1 day
        autoRemove: 'native'
    }),
    cookie: { 
        maxAge: 1000 * 60 * 60 * 24,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    }
}));

// Make user data available to all views
app.use((req, res, next) => {
    res.locals.utilisateur = req.session.utilisateur;
    next();
});

// Configuration du moteur de template EJS
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.set('layout', 'layouts/main');

// Dossier des fichiers statiques
app.use(express.static('public'));

// Routes de base
app.get('/', (req, res) => {
    if (req.session.utilisateur) {
        res.redirect('/dashboard');
    } else {
        res.redirect('/utilisateur/connexion');
    }
});

// Routes
app.use('/dashboard', dashboardRoutes);
app.use('/utilisateur', utilisateurRoutes);
app.use('/produits', produitRoutes);
app.use('/ventes', venteRoutes);

// Gestion des erreurs 404
app.use((req, res) => {
    res.status(404).render('errors/404', { 
        title: 'Page non trouvée',
        layout: 'layouts/main'
    });
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).render('errors/error', {
        error: {
            message: err.message || 'Une erreur est survenue',
            status: err.status || 500
        }
    });
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});