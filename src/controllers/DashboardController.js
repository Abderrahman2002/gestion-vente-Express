const Produit = require('../models/Produit');
const Vente = require('../models/Vente');

const getDashboardData = async (req, res) => {
    try {
        // Statistiques générales
        const stats = {
            totalProduits: await Produit.countDocuments(),
            ventesJour: await Vente.countDocuments({
                createdAt: {
                    $gte: new Date().setHours(0, 0, 0, 0)
                }
            }),
            chiffreAffaires: (await Vente.aggregate([
                { $group: { _id: null, total: { $sum: "$prixTotal" } } }
            ]))[0]?.total || 0
        };

        // Dernières ventes
        const dernieresVentes = await Vente.find()
            .populate('produit')
            .sort('-createdAt')
            .limit(5);

        // Produits en rupture ou presque
        const produitsRupture = await Produit.find({ qtestock: { $lt: 10 } })
            .sort('qtestock')
            .limit(5);

        res.render('dashboard/index', {
            stats,
            dernieresVentes,
            produitsRupture,
            layout: 'layouts/dashboard'
        });
    } catch (error) {
        res.status(500).render('errors/error', { error });
    }
};

module.exports = {
    getDashboardData
};
