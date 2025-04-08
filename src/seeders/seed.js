require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Utilisateur = require('../models/Utilisateur');
const Produit = require('../models/Produit');
const Vente = require('../models/Vente');
const connectDB = require('../database/connect');

const utilisateurs = [
    {
        nom: 'Admin User',
        email: 'admin@example.com',
        password: 'admin123',
        role: 'admin'
    },
    {
        nom: 'Test User',
        email: 'user@example.com',
        password: 'user123',
        role: 'user'
    }
];

const produits = [
    {
        nom: 'iPhone 13',
        marque: 'Apple',
        prix: 899.99,
        qtestock: 50,
        description: 'Dernier modèle iPhone avec appareil photo amélioré'
    },
    {
        nom: 'Galaxy S21',
        marque: 'Samsung',
        prix: 799.99,
        qtestock: 30,
        description: 'Smartphone Android haut de gamme'
    },
    {
        nom: 'MacBook Pro',
        marque: 'Apple',
        prix: 1299.99,
        qtestock: 20,
        description: 'Ordinateur portable professionnel'
    },
    {
        nom: 'Surface Laptop',
        marque: 'Microsoft',
        prix: 999.99,
        qtestock: 15,
        description: 'Ordinateur portable élégant sous Windows'
    },
    {
        nom: 'PlayStation 5',
        marque: 'Sony',
        prix: 499.99,
        qtestock: 10,
        description: 'Console de jeux dernière génération'
    }
];

const createSampleVentes = async (utilisateurs, produits) => {
    const ventes = [
        {
            produit: produits[0]._id, // iPhone 13
            quantite: 2,
            prixUnitaire: produits[0].prix,
            prixTotal: produits[0].prix * 2,
            client: {
                nom: "Jean Dupont",
                email: "jean.dupont@email.com"
            },
            vendeur: utilisateurs[0]._id,
            createdAt: new Date('2024-03-01')
        },
        {
            produit: produits[1]._id, // Galaxy S21
            quantite: 1,
            prixUnitaire: produits[1].prix,
            prixTotal: produits[1].prix,
            client: {
                nom: "Marie Martin",
                email: "marie.martin@email.com"
            },
            vendeur: utilisateurs[1]._id,
            createdAt: new Date('2024-03-02')
        },
        {
            produit: produits[2]._id, // MacBook Pro
            quantite: 1,
            prixUnitaire: produits[2].prix,
            prixTotal: produits[2].prix,
            client: {
                nom: "Pierre Durant",
                email: "pierre.durant@email.com"
            },
            vendeur: utilisateurs[0]._id,
            createdAt: new Date('2024-03-03')
        },
        {
            produit: produits[3]._id, // Surface Laptop
            quantite: 3,
            prixUnitaire: produits[3].prix,
            prixTotal: produits[3].prix * 3,
            client: {
                nom: "Sophie Bernard",
                email: "sophie.bernard@email.com"
            },
            vendeur: utilisateurs[1]._id,
            createdAt: new Date('2024-03-04')
        }
    ];

    return await Vente.insertMany(ventes);
};

const seedDB = async () => {
    try {
        await connectDB();

        // Suppression des données existantes
        await Utilisateur.deleteMany({});
        await Produit.deleteMany({});
        await Vente.deleteMany({});

        // Création des utilisateurs avec mots de passe hashés
        const utilisateursPromises = utilisateurs.map(async (user) => {
            const hashedPassword = await bcrypt.hash(user.password, 12);
            return {
                ...user,
                password: hashedPassword
            };
        });
        
        const utilisateursCreated = await Utilisateur.insertMany(
            await Promise.all(utilisateursPromises)
        );
        
        // Création des produits
        const produitsCreated = await Produit.insertMany(produits);

        // Création des ventes
        await createSampleVentes(utilisateursCreated, produitsCreated);

        console.log('Base de données remplie avec succès !');
        console.log(`${utilisateursCreated.length} utilisateurs créés`);
        console.log(`${produitsCreated.length} produits créés`);
        console.log('4 ventes créées');
        
        process.exit(0);
    } catch (error) {
        console.error('Erreur lors du remplissage de la base de données:', error);
        process.exit(1);
    }
};

seedDB();
