const express = require('express');
const router = express.Router();
const utilisateurController = require('../controllers/UtilisateurController');
const { estNonAuthentifie } = require('../middlewares/auth');

router.get('/inscription', estNonAuthentifie, utilisateurController.formulaireInscription);
router.post('/inscription', estNonAuthentifie, utilisateurController.inscription);
router.get('/connexion', estNonAuthentifie, utilisateurController.formulaireConnexion);
router.post('/connexion', estNonAuthentifie, utilisateurController.connexion);
router.get('/deconnexion', utilisateurController.deconnexion);

module.exports = router;