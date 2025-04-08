const Produit = require('../models/Produit');

const listerProduits = async (req, res) => {
    try {
        const produits = await Produit.find().sort('nom');
        res.render('produits/index', { 
            produits,
            layout: 'layouts/dashboard',
            title: 'Liste des produits'
        });
    } catch (error) {
        res.status(500).render('errors/error', { 
            error,
            layout: 'layouts/dashboard'
        });
    }
};

const afficherFormulaireProduit = (req, res) => {
    res.render('produits/ajouter', { 
        layout: 'layouts/dashboard',
        title: 'Ajouter un produit'
    });
};

const creerProduit = async (req, res) => {
    try {
        await Produit.create(req.body);
        res.redirect('/produits');
    } catch (error) {
        res.render('produits/ajouter', { 
            error: error.message,
            layout: 'layouts/dashboard',
            title: 'Ajouter un produit'
        });
    }
};

const detailsProduit = async (req, res) => {
    try {
        const produit = await Produit.findById(req.params.id);
        if (!produit) {
            throw new Error('Produit non trouvé');
        }
        res.render('produits/details', { 
            produit,
            layout: 'layouts/dashboard',
            title: 'Détails du produit'
        });
    } catch (error) {
        res.status(404).render('errors/error', { 
            error,
            layout: 'layouts/dashboard'
        });
    }
};

const modifierProduit = async (req, res) => {
    try {
        const produit = await Produit.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        res.redirect(`/produits/${produit._id}`);
    } catch (error) {
        res.render('produits/modifier', { 
            error: error.message,
            produit: req.body,
            layout: 'layouts/dashboard',
            title: 'Modifier le produit'
        });
    }
};

module.exports = {
    listerProduits,
    afficherFormulaireProduit,
    creerProduit,
    detailsProduit,
    modifierProduit
};