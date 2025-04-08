const estAuthentifie = (req, res, next) => {
    if (req.session.utilisateur) {
        return next();
    }
    res.redirect('/utilisateur/connexion');
};

const estNonAuthentifie = (req, res, next) => {
    if (!req.session.utilisateur) {
        return next();
    }
    res.redirect('/');
};

const estAdmin = (req, res, next) => {
    if (req.session.utilisateur && req.session.utilisateur.role === 'admin') {
        return next();
    }
    res.status(403).render('error', { message: 'Accès non autorisé' });
};

module.exports = { estAuthentifie, estNonAuthentifie, estAdmin };
