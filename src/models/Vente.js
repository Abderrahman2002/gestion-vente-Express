const mongoose = require('mongoose');

const venteSchema = new mongoose.Schema({
    produit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Produit',
        required: true
    },
    quantite: {
        type: Number,
        required: true,
        min: 1
    },
    prixUnitaire: {
        type: Number,
        required: true
    },
    prixTotal: {
        type: Number,
        required: true
    },
    client: {
        nom: String,
        email: String
    },
    vendeur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Utilisateur',
        required: true
    },
    statut: {
        type: String,
        enum: ['en attente', 'confirmée', 'annulée'],
        default: 'confirmée'
    }
}, {
    timestamps: true
});

// Calculer le prix total avant la sauvegarde
venteSchema.pre('save', function(next) {
    this.prixTotal = this.prixUnitaire * this.quantite;
    next();
});

module.exports = mongoose.model('Vente', venteSchema);
