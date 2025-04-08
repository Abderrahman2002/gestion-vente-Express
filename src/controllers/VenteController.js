const Vente = require('../models/Vente');
const Produit = require('../models/Produit');
const Utilisateur = require('../models/Utilisateur');

const listerVentes = async (req, res) => {
    try {
        const ventes = await Vente.find()
            .populate('produit')
            .populate('vendeur', 'nom email')
            .sort('-createdAt');
        res.render('ventes/index', { ventes });
    } catch (error) {
        res.status(500).render('error', { error });
    }
};

const afficherFormulaireVente = async (req, res) => {
    try {
        const produits = await Produit.find();
        res.render('ventes/ajouter', { produits });
    } catch (error) {
        res.status(500).render('error', { error });
    }
};

const creerVente = async (req, res) => {
    try {
        const { produitId, quantite, client } = req.body;
        const produit = await Produit.findById(produitId);

        if (!produit || produit.qtestock < quantite) {
            throw new Error('Stock insuffisant');
        }

        const vente = await Vente.create({
            produit: produitId,
            quantite,
            prixUnitaire: produit.prix,
            client,
            vendeur: req.session.utilisateur._id
        });

        // Mettre à jour le stock
        produit.qtestock -= quantite;
        await produit.save();

        res.redirect('/ventes');
    } catch (error) {
        const produits = await Produit.find();
        res.render('ventes/ajouter', { produits, error: error.message });
    }
};

const detailsVente = async (req, res) => {
    try {
        const vente = await Vente.findById(req.params.id)
            .populate('produit')
            .populate('vendeur', 'nom email');
        res.render('ventes/details', { vente });
    } catch (error) {
        res.status(404).render('error', { error });
    }
};

module.exports = {
    listerVentes,
    afficherFormulaireVente,
    creerVente,
    detailsVente
};