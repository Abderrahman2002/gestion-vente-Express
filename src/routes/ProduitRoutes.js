const express = require('express');
const router = express.Router();
const produitController = require('../controllers/ProduitController');
const { estAuthentifie } = require('../middlewares/auth');

router.use(estAuthentifie);

router.get('/', produitController.listerProduits);
router.get('/ajouter', produitController.afficherFormulaireProduit);
router.post('/ajouter', produitController.creerProduit);
router.get('/:id', produitController.detailsProduit);
router.post('/:id/modifier', produitController.modifierProduit);

module.exports = router;