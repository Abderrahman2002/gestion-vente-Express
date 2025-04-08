const Utilisateur = require('../models/Utilisateur');
const bcrypt = require('bcryptjs');

const formulaireInscription = (req, res) => {
    res.render('utilisateur/inscription');
};

const inscription = async (req, res) => {
    try {
        const utilisateur = await Utilisateur.create(req.body);
        req.session.utilisateur = utilisateur;
        res.redirect('/');
    } catch (error) {
        res.render('utilisateur/inscription', { error: error.message });
    }
};

const formulaireConnexion = (req, res) => {
    res.render('utilisateur/connexion');
};

const connexion = async (req, res) => {
    try {
        const { email, password } = req.body;
        const utilisateur = await Utilisateur.findOne({ email });
        
        if (!utilisateur || !(await bcrypt.compare(password, utilisateur.password))) {
            throw new Error('Email ou mot de passe incorrect');
        }
        
        req.session.utilisateur = utilisateur;
        res.redirect('/');
    } catch (error) {
        res.render('utilisateur/connexion', { error: error.message });
    }
};

const deconnexion = (req, res) => {
    req.session.destroy();
    res.redirect('/utilisateur/connexion');
};

module.exports = {
    formulaireInscription,
    inscription,
    formulaireConnexion,
    connexion,
    deconnexion
};