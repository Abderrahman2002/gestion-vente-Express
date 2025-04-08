const express = require('express');
const router = express.Router();
const venteController = require('../controllers/VenteController');
const { estAuthentifie } = require('../middlewares/auth');

router.use(estAuthentifie); // Protéger toutes les routes de vente

router.get('/', venteController.listerVentes);
router.get('/ajouter', venteController.afficherFormulaireVente);
router.post('/ajouter', venteController.creerVente);
router.get('/:id', venteController.detailsVente);

module.exports = router;