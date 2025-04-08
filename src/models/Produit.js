const mongoose = require('mongoose');

const produitSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    marque: {
        type: String,
        required: true
    },
    prix: {
        type: Number,
        required: true,
        min: 0
    },
    qtestock: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Produit', produitSchema);
